<?php
header("Content-Type: application/json");
require_once("db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);

$user_id = intval($data['user_id'] ?? 0);
$date = $data['date'] ?? '';
$time = $data['time'] ?? '';
$people = intval($data['people'] ?? 0);

$response = [];

if ($user_id <= 0 || empty($date) || empty($time) || $people <= 0) {
    $response["success"] = false;
    $response["error"] = "All fields are required.";
    echo json_encode($response);
    exit();
}

$stmt = $conn->prepare("INSERT INTO bookings (user_id, date, time, people) VALUES (?, ?, ?, ?)");
$stmt->bind_param("issi", $user_id, $date, $time, $people);

if ($stmt->execute()) {
    $response["success"] = true;
} else {
    $response["success"] = false;
    $response["error"] = $conn->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);
exit();
?>