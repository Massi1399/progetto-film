<?php 
    if(!isset($_SESSION)) { 
        session_start(); 
    }
    $_SESSION = [];
    if(session_destroy())
        http_response_code(200);
    else
        http_response_code(400);    
?>