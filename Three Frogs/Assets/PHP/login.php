<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = htmlspecialchars($_POST["email"]);
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT id, name, password, avatar FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $name, $hashed_password, $avatar);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            echo json_encode([
                "status" => "success",
                "id" => $id,
                "name" => $name,
                "email" => $email,
                "avatar" => $avatar
            ]);
        } else {
            echo json_encode(["status" => "wrong_password"]);
        }
    } else {
        echo json_encode(["status" => "not_found"]);
    }

    $stmt->close();
}
$conn->close();
?>