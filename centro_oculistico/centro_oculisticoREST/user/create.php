<?php
//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/user.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);
$data = json_decode(file_get_contents("php://input"));
if(

    !empty($data->cdf) &&
    !empty($data->name) &&
    !empty($data->surname) &&
    !empty($data->gender) &&
    !empty($data->dateOfBirth) &&
    !empty($data->email) &&
    !empty($data->phoneNumber) &&
    !empty($data->passwd)
){
    $user->cdf=$data->cdf;
    $user->name=$data->name;
    $user->surname=$data->surname;
    $user->gender=$data->gender;
    $user->dateOfBirth=$data->dateOfBirth;
    $user->email=$data->email;
    $user->phoneNumber=$data->phoneNumber;
    $user->passwd=$data->passwd;

    $result=$user->create();
    switch ($result){
        case "ERROR":
            http_response_code(400);
            echo json_encode(array("message" => "Impossibile creare l'utente i dati sono incompleti o errati."));
            break;
        case "ALREADY_EXISTS":
            //503 servizio non disponibile
            http_response_code(503);
            echo json_encode(array("message" => "Utente già esistente."));
            break;
        case "SUCCESS":
            http_response_code(201);
            echo json_encode(array("message" => "Utente creato correttamente."));
            break;
    }
}
else{
    //400 bad request
    http_response_code(400);
    echo json_encode(array("message" => "Impossibile creare l'utente i dati sono incompleti o errati."));
}
?>