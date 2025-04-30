<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

$response = [];

if (!isset($_SESSION['user'])) {
    $response["success"] = false;
    $response["error"] = "You must be logged in to make a booking.";
    echo json_encode($response);
    exit;
}

$user = $_SESSION['user'];
$email = $user['email'];

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$date = $data['date'] ?? '';
$start = $data['start'] ?? '';
$end = $data['end'] ?? '';
$people = $data['people'] ?? '';

if (!$name || !$email || !$date || !$start || !$end || !$people) {
    $response["success"] = false;
    $response["error"] = "All fields are required.";
    echo json_encode($response);
    exit;
}

if ($email !== $user['email']) {
    $response["success"] = false;
    $response["error"] = "Email does not match the logged-in user.";
    echo json_encode($response);
    exit;
}

if ($end <= $start) {
    $response["success"] = false;
    $response["error"] = "End time must be later than start time.";
    echo json_encode($response);
    exit;
}

$checkStmt = $conn->prepare("SELECT COUNT(*) FROM bookings WHERE date = ? AND ((start_time <= ? AND end_time >= ?) OR (start_time <= ? AND end_time >= ?)) AND status = 'active'");
$checkStmt->bind_param("sssss", $date, $start, $start, $end, $end);
$checkStmt->execute();
$checkStmt->bind_result($count);
$checkStmt->fetch();
$checkStmt->close();

if ($count > 0) {
    $response["success"] = false;
    $response["error"] = "The selected time slot is already booked.";
    echo json_encode($response);
    exit;
}

$stmt = $conn->prepare("INSERT INTO bookings (name, email, date, start_time, end_time, people, status) VALUES (?, ?, ?, ?, ?, ?, 'active')");
$stmt->bind_param("sssssi", $name, $email, $date, $start, $end, $people);

if ($stmt->execute()) {
    $response["success"] = true;
} else {
    $response["success"] = false;
    $response["error"] = "Failed to save booking. " . $conn->error;
}

$stmt->close();
$conn->close();
echo json_encode($response);
?>