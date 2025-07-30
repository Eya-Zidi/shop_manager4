<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once("../auth/connexion.php");

try {
    $stmtDevis = $pdo->query("SELECT * FROM demande_achat where situation = 'rejected' ORDER BY id DESC");
    $devisList = $stmtDevis->fetchAll(PDO::FETCH_ASSOC);

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
