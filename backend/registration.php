<?php
header("Access-Control-Allow-Origin: *"); // Handle CORS if needed
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

//Import the JWT class
require_once 'path/to/firebase-jwt-library/src/JWT.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


// Read the POST data from the Angular request
$data = json_decode(file_get_contents("php://input"));

// Log the received data for debugging
error_log(print_r($data, true), 3, 'backend_errors.log');

// Check if the required fields are set
if (isset($data->name) && isset($data->surname) && isset($data->email) && isset($data->password) && isset($data->confirmPassword)) {
    
    // Basic validation
    if ($data->password !== $data->confirmPassword) {
        http_response_code(400);
        echo json_encode(["message" => "Passwords do not match"]);
        exit();
    }

    $name = filter_var(htmlspecialchars(trim($data->name)), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z\s]+$/")));
    $surname = filter_var(htmlspecialchars(trim($data->surname)), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z\s]+$/")));
    $email = filter_var(htmlspecialchars(trim($data->email)), FILTER_VALIDATE_EMAIL);
    $password = filter_var($data->password, FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^.{8,}$/")));

    if (!$name || !$surname || !$email || !$password) {
        error_log(date("Y-m-d H:i:s") ."Invalid sanitization\n", 3, 'backend_errors.log');
        http_response_code(400);
        echo json_encode(["message" => "Invalid sanitization"]);
        exit();
    }

    $hashPwd = password_hash($password, PASSWORD_DEFAULT);
    //$sKey = password_hash($, PASSWORD_DEFAULT);

    require_once 'db_conn.php';

    try {
        $stmt = mysqli_prepare($conn, "INSERT INTO Utenti (name, surname, email, password) VALUES (?,?,?,?)");

        mysqli_stmt_bind_param($stmt, 'ssss', $name, $surname, $email, $hashPwd);

        mysqli_stmt_execute($stmt);

        if (mysqli_affected_rows($conn) < 1) {
            error_log(date("Y-m-d H:i:s") . "No Insert Performed \n", 3, 'db_errors.log');
            http_response_code(400);
            echo json_encode(["message" => "No Insert"]);
            exit();
        }

        mysqli_stmt_close($stmt);
        mysqli_close($conn);

    }catch(mysqli_sql_exception $e){
        error_log(date("Y-m-d H:i:s") . $e->getMessage(), 3, "db_errors.log");
        header("Location: unexpected_error.php");
        exit;
    }

    // Simulate success (in real-life this will depend on the success of the DB operation)
    http_response_code(200);
    $response = [
          'user' => [
          'role' => 'user',
          'name' => $name.' '.$surname,
          'email' => $email
        ]
    ];
    session_start();
    $_SESSION['user'] = $response['user'];
    $_SESSION['logged_in'] = true;
    echo json_encode($response);
    
    /* Create JWT token
    $payload = array(
        "name" => $name,
        "surname" => $surname,
        "email" => $email,
        "role" => "user",
    );*/
    $jwt = JWT::encode($payload, $sKey);
    echo json_encode(["token" => $jwt]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input"]);
}
?>
