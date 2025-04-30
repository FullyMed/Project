<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

$response = [];

if (!isset($_SESSION['user'])) {
    $response["success"] = false;
    $response["error"] = "You must be logged in to cancel a booking.";
    echo json_encode($response);
    exit;
}

$email = $_POST['email'] ?? '';
$date = $_POST['date'] ?? '';
$start = $_POST['start'] ?? '';
$end = $_POST['end'] ?? '';

if (!$email || !$date || !$start || !$end) {
    $response["success"] = false;
    $response["error"] = "All fields are required.";
    echo json_encode($response);
    exit;
}

if ($email !== $_SESSION['user']['email']) {
    $response["success"] = false;
    $response["error"] = "Email does not match the logged-in user.";
    echo json_encode($response);
    exit;
}

$checkBookingStmt = $conn->prepare("SELECT COUNT(*) FROM bookings WHERE email = ? AND date = ? AND start_time = ? AND end_time = ? AND status = 'active'");
$checkBookingStmt->bind_param("ssss", $email, $date, $start, $end);
$checkBookingStmt->execute();
$checkBookingStmt->bind_result($bookingCount);
$checkBookingStmt->fetch();
$checkBookingStmt->close();

if ($bookingCount == 0) {
    $response["success"] = false;
    $response["error"] = "Booking not found or already cancelled.";
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

$stmt = $conn->prepare("UPDATE bookings SET status = 'cancelled' WHERE email = ? AND date = ? AND start_time = ? AND end_time = ?");
$stmt->bind_param("ssss", $email, $date, $start, $end);

if ($stmt->execute()) {
    $logStmt = $conn->prepare("INSERT INTO cancellations (email, date, start, end, cancel_time) VALUES (?, ?, ?, ?, NOW())");
    $logStmt->bind_param("ssss", $email, $date, $start, $end);
    $logStmt->execute();
    $logStmt->close();

    $response["success"] = true;
    $response["remaining_cancel"] = 2 - ($cancelCount + 1);
} else {
    $response["success"] = false;
    $response["error"] = $conn->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>