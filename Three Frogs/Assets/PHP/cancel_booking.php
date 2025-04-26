<?php
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

$stmt = $conn->prepare("DELETE FROM bookings WHERE email = ? AND date = ? AND start = ? AND end = ?");
$stmt->bind_param("ssss", $email, $date, $start, $end);

if ($stmt->execute()) {
    $response["success"] = true;
} else {
    $response["success"] = false;
    $response["error"] = $conn->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>