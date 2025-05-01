<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

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

$bookings = [];
if ($stmt->execute()) {
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $bookings[] = [
            "date" => $row["date"],
            "start" => $row["start_time"],
            "end" => $row["end_time"],
            "people" => $row["people"]
        ];
    }
    $stmt->close();
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Error fetching bookings: " . $conn->error
    ]);
    exit;
}

$currentYear = date("Y");
$currentMonth = date("m");
$cancelStmt = $conn->prepare("
    SELECT COUNT(*) AS cancel_count
    FROM cancellation_log
    WHERE email = ? AND YEAR(cancel_date) = ? AND MONTH(cancel_date) = ?
");
$cancelStmt->bind_param("sii", $email, $currentYear, $currentMonth);

$remainingCancels = 2;
if ($cancelStmt->execute()) {
    $result = $cancelStmt->get_result();
    if ($row = $result->fetch_assoc()) {
        $used = intval($row["cancel_count"]);
        $remainingCancels = max(0, 2 - $used);
    }
    $cancelStmt->close();
} else {
}

http_response_code(200);
echo json_encode([
    "success" => true,
    "bookings" => $bookings,
    "remaining_cancels" => $remainingCancels
]);

$conn->close();
?>