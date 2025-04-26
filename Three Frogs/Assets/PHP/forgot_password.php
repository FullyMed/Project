<?php
header("Content-Type: application/json");
require_once("db_connect.php");

$email = $_POST['email'] ?? '';
$newPassword = $_POST['newPassword'] ?? '';

$response = [];

if (!$email || !$newPassword) {
    $response["success"] = false;
    $response["error"] = "Email and new password are required.";
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