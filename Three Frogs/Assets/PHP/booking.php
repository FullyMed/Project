<?php
include 'db.php';

$user_id = $_POST['user_id'];
$boardgame = $_POST['boardgame'];
$date = $_POST['date'];
$time = $_POST['time'];

$stmt = $conn->prepare("INSERT INTO bookings (user_id, boardgame, date, time) VALUES (?, ?, ?, ?)");
$stmt->bind_param("isss", $user_id, $boardgame, $date, $time);
$stmt->execute();

echo json_encode(["status" => "success"]);
?>