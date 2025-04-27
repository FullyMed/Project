<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

$name = $_POST['name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$avatar = $_POST['avatar'] ?? "Assets/Images/Avatars/Clam.jpg";

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