<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);

$email = strtolower(trim($data['email'] ?? ''));
$newPassword = $data['newPassword'] ?? '';

$response = [];

if (empty($email) || empty($newPassword)) {
    $response["success"] = false;
    $response["error"] = "Email and new password are required.";
    echo json_encode($response);
    exit;
}

if (strlen($newPassword) < 6) {
    $response["success"] = false;
    $response["error"] = "Password must be at least 6 characters.";
    echo json_encode($response);
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
        $response["success"] = true;
    } else {
        $response["success"] = false;
        $response["error"] = "Failed to update password.";
    }

    $update->close();
} else {
    $response["success"] = false;
    $response["error"] = "Email not found.";
}

$stmt->close();
$conn->close();
echo json_encode($response);
?>