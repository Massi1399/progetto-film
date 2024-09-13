<?php
    require_once 'credential.php';
    try{
        $conn = mysqli_connect($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV["DB_PASS"] ,$_ENV["DB_NAME"]);
        if(!$conn){
            error_log( date("Y-m-d H:i:s") . mysqli_connect_error(), 3, 'db_errors.log');
            http_response_code(400);
            echo json_encode(["message" => "Failed DB connection\n"]);
            exit();
        }   
    }
    catch(mysqli_sql_exception $e){
        error_log(date("Y-m-d H:i:s") . $e->getMessage(), 3, 'db_errors.log');
        http_response_code(500);
        echo json_encode(["message" => "Internal server error"]);
        exit();
    }
     