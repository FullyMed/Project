<?php
session_start();
header("Content-Type: application/json");
require_once("db_connect.php");

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "All fields are required."
    ]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['user'] = [
            "name" => $user['name'] ?? 'Unknown User',
            "email" => $user['email'],
            "avatar" => $user['avatar'] ?? ''
        ];
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "debug" => "Session set: " . print_r($_SESSION['user'], true)
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "error" => "Invalid email or password."
        ]);
    }
} else {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "error" => "Invalid email or password."
    ]);
}

$stmt->close();
$conn->close();
?>