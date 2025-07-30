<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once("../auth/connexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;

    if (!$id) {
        echo json_encode([
            "success" => false,
            "message" => "ID manquant."
        ]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("UPDATE demande_achat SET situation = 'stock' WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode([
                "success" => true,
                "message" => "Situation mise à jour."
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Aucune demande trouvée avec cet ID ou déjà à jour."
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            "success" => false,
            "message" => "Erreur base de données: " . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Méthode HTTP non autorisée."
    ]);
}
