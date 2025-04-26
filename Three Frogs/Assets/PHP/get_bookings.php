<?php
header("Content-Type: application/json");
require_once("db_connect.php");

$email = $_POST['email'] ?? '';

$response = [
    "success" => false,
    "bookings" => [],
    "error" => ""
];

if (!$email) {
    $response["error"] = "Email is required.";
    echo json_encode($response);
    exit;
}

$stmt = $conn->prepare("SELECT date, start, end, people FROM bookings WHERE email = ? ORDER BY date, start");
$stmt->bind_param("s", $email);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $bookings = [];

    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }

    $response["success"] = true;
    $response["bookings"] = $bookings;
} else {
    $response["error"] = $conn->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>