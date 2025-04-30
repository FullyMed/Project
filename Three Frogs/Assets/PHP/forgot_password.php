<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

$email = strtolower(trim($_POST['email'] ?? ''));
$newPassword = trim($_POST['password'] ?? '');

if (empty($email) || empty($newPassword)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Email and new password are required."
    ]);
    exit;
}

if (strlen($newPassword) < 8) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Password must be at least 8 characters long."
    ]);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    $update = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
    $update->bind_param("ss", $hashedPassword, $email);

    if ($update->execute()) {
        http_response_code(200);
        echo json_encode([
            "success" => true
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "error" => "Failed to update password."
        ]);
    }
    $update->close();
} else {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "error" => "Email not found."
    ]);
}

$stmt->close();
$conn->close();
?>