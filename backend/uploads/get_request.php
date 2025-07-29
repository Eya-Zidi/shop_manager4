<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "your_database");

$result = $conn->query("SELECT piece_name FROM demande");

$rows = array();
while($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode($rows);
?>
