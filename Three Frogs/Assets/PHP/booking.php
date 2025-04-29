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
$name = $user['name'];
$email = $user['email'];

$data = json_decode(file_get_contents("php://input"), true);

$date = $data['date'] ?? '';
$start = $data['start'] ?? '';
$end = $data['end'] ?? '';
$people = $data['people'] ?? '';

if (!$date || !$start || !$end || !$people) {
    $response["success"] = false;
    $response["error"] = "All fields are required.";
    echo json_encode($response);
    exit;
}

$stmt = $conn->prepare("INSERT INTO bookings (name, email, date, start_time, end_time, people) VALUES (?, ?, ?, ?, ?, ?)");
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