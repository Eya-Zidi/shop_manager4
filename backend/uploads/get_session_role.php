<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION['role']) && isset($_SESSION['role_expire']) && time() < $_SESSION['role_expire']) {
    echo json_encode(['role' => $_SESSION['role']]);
} else {
    echo json_encode(['role' => null]);
}

?>