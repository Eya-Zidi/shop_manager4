<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once("../auth/connexion.php");

try {
   
    $stmtDemande = $pdo->query("SELECT * FROM demande ORDER BY id DESC");
    $demandeList = $stmtDemande->fetchAll(PDO::FETCH_ASSOC);

  
    $stmtDevis = $pdo->query("SELECT * FROM devis ORDER BY id DESC");
    $devisList = $stmtDevis->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "demande" => $demandeList,
        "devis"   => $devisList
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
