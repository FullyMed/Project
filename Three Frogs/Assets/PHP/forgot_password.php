<?php
header("Content-Type: application/json");
require_once("db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$newPassword = $data['newPassword'] ?? '';

$response = [];

if (empty($email) || empty($newPassword)) {
    $response["success"] = false;
    $response["error"] = "Email and new password are required.";
    echo json_encode($response);
    exit();
}

$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows !== 1) {
    $response["success"] = false;
    $response["error"] = "Email not found.";
    echo json_encode($response);
    $stmt->close();
    $conn->close();
    exit();
}

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
$stmt->close();
$conn->close();

echo json_encode($response);
exit();
?>