<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

function respond($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

if (!isset($_SESSION['user']) || empty($_SESSION['user']['email'])) {
    respond(401, [
        "success" => false,
        "error" => "You must be logged in to cancel a booking."
    ]);
}

$input = json_decode(file_get_contents("php://input"), true);
$email = $input['email'] ?? '';
$date = $input['date'] ?? '';
$start = $input['start'] ?? '';
$end = $input['end'] ?? '';

if (!$email || !$date || !$start || !$end) {
    respond(400, [
        "success" => false,
        "error" => "All fields are required."
    ]);
}

if ($email !== $_SESSION['user']['email']) {
    respond(403, [
        "success" => false,
        "error" => "Email does not match the logged-in user."
    ]);
}

$checkBooking = $conn->prepare("SELECT COUNT(*) FROM bookings WHERE email = ? AND date = ? AND start_time = ? AND end_time = ?");
$checkBooking->bind_param("ssss", $email, $date, $start, $end);
$checkBooking->execute();
$checkBooking->bind_result($bookingCount);
$checkBooking->fetch();
$checkBooking->close();

if ($bookingCount === 0) {
    respond(404, [
        "success" => false,
        "error" => "Booking not found."
    ]);
}

$cancelLimit = 2;
$cancelStmt = $conn->prepare("
    SELECT COUNT(*) AS cancel_count 
    FROM cancellation_log 
    WHERE email = ? AND YEAR(cancel_date) = YEAR(CURDATE()) AND MONTH(cancel_date) = MONTH(CURDATE())
");
$cancelStmt->bind_param("s", $email);
$cancelStmt->execute();
$cancelResult = $cancelStmt->get_result();
$cancelCount = (int) $cancelResult->fetch_assoc()['cancel_count'];
$cancelStmt->close();

if ($cancelCount >= $cancelLimit) {
    respond(403, [
        "success" => false,
        "error" => "You have reached the monthly cancellation limit (2 per month)."
    ]);
}

$deleteStmt = $conn->prepare("DELETE FROM bookings WHERE email = ? AND date = ? AND start_time = ? AND end_time = ?");
$deleteStmt->bind_param("ssss", $email, $date, $start, $end);

if ($deleteStmt->execute() && $deleteStmt->affected_rows > 0) {
    $logStmt = $conn->prepare("INSERT INTO cancellation_log (email, cancel_date) VALUES (?, CURDATE())");
    $logStmt->bind_param("s", $email);
    $logStmt->execute();
    $logStmt->close();

    $remaining = max(0, $cancelLimit - ($cancelCount + 1));
    respond(200, [
        "success" => true,
        "remaining_cancel" => $remaining
    ]);
} else {
    respond(500, [
        "success" => false,
        "error" => "Failed to cancel booking."
    ]);
}

$deleteStmt->close();
$conn->close();
?>