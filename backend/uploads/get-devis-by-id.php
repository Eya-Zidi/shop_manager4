<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once("../auth/connexion.php");
$id = $_GET['id'] ?? null;

try {
    $stmt = $pdo->prepare("SELECT * FROM demande_devis WHERE situation = 'pending' and id = ? ");
    $stmt->execute([$id]);
    $devisList = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "devis" => $devisList
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
