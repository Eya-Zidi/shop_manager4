<?php



require_once("../auth/connexion.php");

$email = $_POST["email"];
$password = $_POST["pwd"];


$stmt = $pdo->prepare("SELECT * FROM employe WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && $password == $user['password']) {
    session_start();
    $_SESSION['role'] = $user['role'];
    $_SESSION['role_expire'] = time() + 5;
    $_SESSION['user_id'] = $user['id'];
    if ($user['role']!='employee'){
        header("Location: " . $_SERVER['HTTP_REFERER']. $user['role']);
    }else{
        header("Location: " . $_SERVER['HTTP_REFERER']. $user['role'].'/'.$user['id']);
    }
    exit();
}
else{
    header("Location: " . $_SERVER['HTTP_REFERER']);
    exit();
}
?>
