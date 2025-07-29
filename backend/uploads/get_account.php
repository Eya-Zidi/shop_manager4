<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");

require_once("../auth/connexion.php");


try {
    $stmt = $pdo->query("SELECT fullName, email, phone, dept, imma, role, status FROM employe WHERE role = 'visitor' AND status = 'pending' ORDER BY imma DESC");
    $users = $stmt->fetchAll();

    echo json_encode(["success" => true, "users" => $users]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Failed to fetch users."]);
}
