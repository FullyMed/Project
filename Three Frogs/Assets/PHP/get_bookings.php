<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

$response = [
    "success" => false,
    "upcoming" => [],
    "history" => [],
    "error" => ""
];

if (!isset($_SESSION['user'])) {
    $response["error"] = "You must be logged in to view bookings.";
    echo json_encode($response);
    exit;
}

$email = $_POST['email'] ?? '';

if (!$email) {
    $response["error"] = "Email is required.";
    echo json_encode($response);
    exit;
}

if ($email !== $_SESSION['user']['email']) {
    $response["error"] = "Email does not match the logged-in user.";
    echo json_encode($response);
    exit;
}

$upcomingStmt = $conn->prepare("SELECT date, start_time, end_time, people FROM bookings WHERE email = ? AND date >= CURDATE() AND status = 'active' ORDER BY date, start_time");
$upcomingStmt->bind_param("s", $email);

if ($upcomingStmt->execute()) {
    $result = $upcomingStmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $response["upcoming"][] = [
            "date" => $row["date"],
            "start" => $row["start_time"],
            "end" => $row["end_time"],
            "people" => $row["people"]
        ];
    }
} else {
    $response["error"] = "Error fetching upcoming: " . $conn->error;
    echo json_encode($response);
    exit;
}
$upcomingStmt->close();

$historyStmt = $conn->prepare("SELECT date, start_time, end_time, people, status FROM bookings WHERE email = ? AND date < CURDATE() ORDER BY date DESC");
$historyStmt->bind_param("s", $email);

if ($historyStmt->execute()) {
    $result = $historyStmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $response["history"][] = [
            "date" => $row["date"],
            "start" => $row["start_time"],
            "end" => $row["end_time"],
            "people" => $row["people"],
            "status" => $row["status"]
        ];
    }
    $response["success"] = true;
} else {
    $response["error"] = "Error fetching history: " . $conn->error;
}

$historyStmt->close();
$conn->close();

echo json_encode($response);
?>