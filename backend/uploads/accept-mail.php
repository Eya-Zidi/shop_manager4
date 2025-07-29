<?php

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

$mail = new PHPMailer(true);


require_once("../auth/connexion.php");
file_put_contents("debug.txt", file_get_contents("php://input"));


$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;
$reason = $data['reason'] ?? '';

if (!$id || !$reason) {
    echo json_encode(["success" => false, "message" => "ID ou raison manquant"]);
    exit;
}

try {


    $stmt = $pdo->prepare("SELECT email FROM demande_achat WHERE id = ?");
    $stmt->execute([$id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row && !empty($row['email'])) {
        $to = $row['email'];
        $name = $row['name'];
        $lastname = $row['lastName'];
        $subject = "Votre demande a été Acceptée";
        $message = "Bonjour,\n\nVotre demande est accepté  :\n\n" . $reason;
        echo json_encode(["to" =>$to, "subject" => $subject, "message" => $message]);
        $headers = "From: eyazidi2000@gmail.com";

        // Envoi de l'email
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'eyazidi2000@gmail.com';
        $mail->Password = 'gacqdsxiufevlkpm';  
        $mail->SMTPSecure = 'tls'; 
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('eyazidi2000@gmail.com', 'directeur financier');
        $mail->addAddress($to, $name . ' ' . $lastname); // Add a recipient

        // Content
        $mail->isHTML(false);
        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->AltBody = 'This is the plain text version.';

        $mail->send();
        echo json_encode(["success" => true, "message" => "Email envoyé"]);
    } else {
        echo json_encode(["success" => false, "message" => "Email introuvable"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erreur DB : " . $e->getMessage()]);
}
