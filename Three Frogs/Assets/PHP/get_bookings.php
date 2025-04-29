<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

$email = $_POST['email'] ?? '';

$response = [
    "success" => false,
    "upcoming" => [],
    "history" => [],
    "error" => ""
];

if (!$email) {
    $response["error"] = "Email is required.";
    echo json_encode($response);
    exit;
}

// Upcoming bookings (today or future)
$upcomingStmt = $conn->prepare("SELECT date, start, end, people FROM bookings WHERE email = ? AND date >= CURDATE() ORDER BY date, start");
$upcomingStmt->bind_param("s", $email);

if ($upcomingStmt->execute()) {
    $result = $upcomingStmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $response["upcoming"][] = $row;
    }
} else {
    $response["error"] = "Error fetching upcoming: " . $conn->error;
    echo json_encode($response);
    exit;
}
$upcomingStmt->close();

// Booking history (past dates only)
$historyStmt = $conn->prepare("SELECT date, start, end, people FROM bookings WHERE email = ? AND date < CURDATE() ORDER BY date DESC");
$historyStmt->bind_param("s", $email);

if ($historyStmt->execute()) {
    $result = $historyStmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $response["history"][] = $row;
    }
    $response["success"] = true;
} else {
    $response["error"] = "Error fetching history: " . $conn->error;
}

$historyStmt->close();
$conn->close();

echo json_encode($response);
?>