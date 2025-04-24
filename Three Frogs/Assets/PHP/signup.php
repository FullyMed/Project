<?php
header("Content-Type: application/json");
require_once("db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$avatar = $data['avatar'];

$stmt = $conn->prepare("INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $password, $avatar);

$response = [];

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