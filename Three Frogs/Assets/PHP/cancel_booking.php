<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

$email = $_POST['email'] ?? '';
$date = $_POST['date'] ?? '';
$start = $_POST['start'] ?? '';
$end = $_POST['end'] ?? '';

$response = [];

if (!$email || !$date || !$start || !$end) {
    $response["success"] = false;
    $response["error"] = "All fields are required.";
    echo json_encode($response);
    exit;
}

$checkStmt = $conn->prepare("SELECT COUNT(*) as cancel_count FROM cancellations WHERE email = ? AND MONTH(cancel_time) = MONTH(CURRENT_DATE()) AND YEAR(cancel_time) = YEAR(CURRENT_DATE())");
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();
$cancelCount = $checkResult->fetch_assoc()['cancel_count'];
$checkStmt->close();

if ($cancelCount >= 2) {
    $response["success"] = false;
    $response["error"] = "You have reached the monthly cancellation limit (2 per month).";
    echo json_encode($response);
    exit;
}

$stmt = $conn->prepare("DELETE FROM bookings WHERE email = ? AND date = ? AND start = ? AND end = ?");
$stmt->bind_param("ssss", $email, $date, $start, $end);

if ($stmt->execute()) {
    $logStmt = $conn->prepare("INSERT INTO cancellations (email, date, start, end, cancel_time) VALUES (?, ?, ?, ?, NOW())");
    $logStmt->bind_param("ssss", $email, $date, $start, $end);
    $logStmt->execute();
    $logStmt->close();

    $response["success"] = true;
    $response["remaining_cancel"] = 1 - $cancelCount;
} else {
    $response["success"] = false;
    $response["error"] = $conn->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>