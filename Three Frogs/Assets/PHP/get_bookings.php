<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

// Check if user is logged in
if (!isset($_SESSION['user']) || empty($_SESSION['user']['email'])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "error" => "You must be logged in to view bookings."
    ]);
    exit;
}

$email = $_POST['email'] ?? '';

if (empty($email)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Email is required."
    ]);
    exit;
}

// Ensure the email matches the logged-in user
if ($email !== $_SESSION['user']['email']) {
    http_response_code(403);
    echo json_encode([
        "success" => false,
        "error" => "Email does not match the logged-in user."
    ]);
    exit;
}

$stmt = $conn->prepare("SELECT date, start AS start_time, end AS end_time, people FROM bookings WHERE email = ? ORDER BY date, start");
$stmt->bind_param("s", $email);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $bookings[] = [
            "date" => $row["date"],
            "start" => $row["start_time"],
            "end" => $row["end_time"],
            "people" => $row["people"]
        ];
    }

    http_response_code(200);
    echo json_encode([
        "success" => true,
        "bookings" => $bookings
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Error fetching bookings: " . $conn->error
    ]);
}

$stmt->close();
$conn->close();
?>