<?php 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if(!isset($_SESSION)) { 
    session_start(); 
}   

$data = json_decode(file_get_contents("php://input"));

if(isset($data->email) && $data->password){

    $email = filter_var(htmlspecialchars(trim($data->email)), FILTER_VALIDATE_EMAIL);
    $pwd = filter_var($data->password, FILTER_VALIDATE_REGEXP, array("options"=>array("regexp"=>"/^.{8,}$/")));

    if(!$email || !$pwd){
        http_response_code(400);
        error_log(date("Y-m-d H:i:s") ."Invalid data\n", 3, 'backend_errors.log');
        echo json_encode(["message" => "Invalid data"]);
        exit();
    }

    require_once 'db_conn.php';
    try{
        $query = "SELECT * FROM Utenti WHERE email = ?;";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, 's', $email);
        if(mysqli_stmt_execute($stmt)){
            if(mysqli_num_rows(mysqli_stmt_get_result($stmt)) == 1){
                $row = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
                if(password_verify($pwd, $row["password"])){
                    $_SESSION['logged-in'] = true;
                    $_SESSION['user'] = [
                                            'role' => $row['role'],
                                            'name' => $row['name'].' '.$row['surname'],
                                            'email' => $row['email']
                                        ];
                }
                else{
                    http_response_code(401);
                    echo json_encode(["message" => "Invalid credentials"]);
                    exit();
                }
            }
            else {
                http_response_code(401);
                echo json_encode(["message" => "Invalid credentials"]);
                exit();
            }
        }
        else{
            http_response_code(500);
            echo json_encode(["message" => "Internal server error"]);
            exit();
        }        

    }
    catch(mysqli_sql_exception $e){
        error_log($e->getMessage(), 3, 'backend_errors.log');
        http_response_code(500);
        echo json_encode(["message" => "Internal server error"]);
        exit();
    }
}
else{
    http_response_code(400);
    error_log(date("Y-m-d H:i:s") ."Invalid data\n", 3, 'backend_errors.log');
    echo json_encode(["message" => "Invalid data"]);
    exit();
}

