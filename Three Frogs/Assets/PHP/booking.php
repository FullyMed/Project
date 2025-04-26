<?php
header("Content-Type: application/json");
require_once("db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$date = $data['date'] ?? '';
$start = $data['start'] ?? '';
$end = $data['end'] ?? '';
$people = intval($data['people'] ?? 0);

$response = [];

if (empty($email) || empty($date) || empty($start) || empty($end) || $people <= 0) {
    $response["success"] = false;
    $response["error"] = "All fields are required.";
    echo json_encode($response);
    exit();
}

$stmt = $conn->prepare("INSERT INTO bookings (email, date, start, end, people) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssssi", $email, $date, $start, $end, $people);

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