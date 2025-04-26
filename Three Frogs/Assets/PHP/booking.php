<?php
header("Content-Type: application/json");
require_once("db_connect.php");

$email = $_POST['email'] ?? '';
$date = $_POST['date'] ?? '';
$start = $_POST['start'] ?? '';
$end = $_POST['end'] ?? '';
$people = intval($_POST['people'] ?? 0);

$response = [];

if (!$email || !$date || !$start || !$end || !$people) {
    $response["success"] = false;
    $response["error"] = "All fields are required.";
    echo json_encode($response);
    exit;
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
?>