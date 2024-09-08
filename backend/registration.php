<?php
    $array_fields = array('name', 'surname', 'email', 'password', 'confirmPassword');
    foreach ($array_fields as $field) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
            error_log("Invalid input", 3, 'backend_errors.log');
            header("Location: unexpected_error.php");
            exit;
        }
    }

    if ($_POST["password"] != $_POST["confirmPassword"]) {
        error_log("Passwords do not match", 3, 'backend_errors.log');
        header("Location: unexpected_error.php");
        exit;
    }

    $name = filter_var(trim($_POST["name"]), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z\s]+$/")));
    $surname = filter_var(trim($_POST['surname']), FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^[a-zA-Z\s]+$/")));
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $password = filter_var($_POST['password'], FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/^.{8,}$/")));

    if (!$name || !$surname || !$email || !$password) {
        error_log("Invalid input", 3, 'backend_errors.log');
        header("Location: unexpected_error.php");
        exit;
    }

    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    require_once 'db_conn.php';

    try {
        $stmt = mysqli_prepare($con, "INSERT INTO Utenti('name', 'surname', 'email', 'password') VALUES (?,?,?,?)");

        mysqli_stmt_bind_param($stmt, 'ssss', $name, $surname, $email, $password);

        mysqli_stmt_execute($stmt);

        if (mysqli_affected_rows($con) < 1) {
            error_log("Unexpected error", 3, 'db_errors.log');
            header("Location: unexpected_error.php");
            exit;
        }

        mysqli_stmt_close($stmt);
        header("Location: ./src/app/app.component.html");
        exit;

    }catch(mysqli_sql_exception $e){
        error_log($e->getMessage(), 3, "db_errors.log");
        header("Location: unexpected_error.php");
        exit;
    }

