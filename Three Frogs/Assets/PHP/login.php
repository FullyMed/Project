<?php
header("Content-Type: application/json");
require_once("db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$response = [];

$stmt = $conn->prepare("SELECT id, name, email, password, avatar FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        unset($user['password']); // remove password before sending to frontend
        $response['success'] = true;
        $response['user'] = $user;
    } else {
        $response['success'] = false;
        $response['error'] = "Incorrect password.";
    }
} else {
    $response['success'] = false;
    $response['error'] = "Email not found.";
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>