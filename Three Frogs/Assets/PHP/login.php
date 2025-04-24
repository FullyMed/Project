<?php
header("Content-Type: application/json");
require_once("db_connect.php");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

$response = [];

$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        $response["success"] = true;
        $response["user"] = [
            "name" => $user['name'],
            "email" => $user['email'],
            "avatar" => $user['avatar']
        ];
    } else {
        $response["success"] = false;
        $response["error"] = "Wrong password.";
    }
} else {
    $response["success"] = false;
    $response["error"] = "Email not found.";
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>