<?php
header("Content-Type: application/json");
require_once("db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$date = $data['date'];
$start = $data['start'];
$end = $data['end'];

$response = [];

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