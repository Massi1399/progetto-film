<?php
    require_once 'credential.php';
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS ,DB_NAME);
    if(!$conn){
        error_log( date("Y-m-d H:i:s") . mysqli_connect_error(), 3, 'db_errors.log');
        http_response_code(400);
        echo json_encode(["message" => "Failed DB connection\n"]);
        exit();
    }    