<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$password = trim($_POST['password'] ?? '');

if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Email and password are required."
    ]);
    exit();
}

$stmt = $conn->prepare("SELECT id, name, email, password, avatar FROM users WHERE email = ? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        $_SESSION['user'] = [
            "id" => $user['id'],
            "name" => $user['name'],
            "email" => $user['email'],
            "avatar" => $user['avatar']
        ];

        unset($user['password']);

        http_response_code(200);
        echo json_encode([
            "success" => true,
            "user" => $user
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "error" => "Incorrect password."
        ]);
    }
} else {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "error" => "Email not found."
    ]);
}

$stmt->close();
$conn->close();