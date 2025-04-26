<?php
header("Content-Type: application/json");
require_once("db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);

$user_id = intval($data['user_id']);
$date = $data['date'];
$time = $data['time'];

$response = [];

$stmt = $conn->prepare("DELETE FROM bookings WHERE user_id = ? AND date = ? AND time = ?");
$stmt->bind_param("iss", $user_id, $date, $time);

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