<?php
    require_once 'credential.php';
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if(!$conn){
        error_log(mysqli_connect_error(), 3, 'db_errors.log');
        header('Location: ../public/unexpected_error.php');
        exit();
    }    