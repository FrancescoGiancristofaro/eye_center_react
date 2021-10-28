<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// includiamo database.php e branch.php per poterli usare
include_once '../config/database.php';
include_once '../models/branch.php';
// creiamo un nuovo oggetto Database e ci colleghiamo al nostro database
$database = new Database();
$db = $database->getConnection();
$branch = new Branch($db);
$stmt = $branch->read();
$num = $stmt->rowCount();
if($num>0){
    $branch_arr = array();
    $branch_arr = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $branch_item = array(
            "idBranch" => $idBranch,
            "address" => $address,
            "city" => $city,
            "switchboardNumber" => $switchboardNumber
        );
        array_push($branch_arr, $branch_item);
    }
    http_response_code(200);
    echo json_encode($branch_arr);
}else{
    http_response_code(404);
    echo json_encode(
        array("message" => "Nessuna sede Trovata.")
    );
}
?>