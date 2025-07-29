<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("../auth/connexion.php");

$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $id = $_POST['id'] ?? null;

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID manquant']);
        exit;
    }

    // Vérifier si la ligne existe
    $stmtCheck = $pdo->prepare("SELECT id, situation FROM demande_devis WHERE id = ?");
    $stmtCheck->execute([$id]);
    $row = $stmtCheck->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        echo json_encode(['success' => false, 'message' => 'Demande introuvable']);
        exit;
    }

    // Mettre à jour la situation
    $stmtUpdate = $pdo->prepare("UPDATE demande_devis SET situation = 'rejected' WHERE id = ?");
    $success = $stmtUpdate->execute([$id]);

    echo json_encode([
        'success' => $success,
        'message' => $success ? 'Demande mise à jour avec succès.' : 'Erreur lors de la mise à jour.'
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur SQL : ' . $e->getMessage()
    ]);
}
