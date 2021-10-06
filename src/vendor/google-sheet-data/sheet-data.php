<?php

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
// error_reporting(E_ALL); 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");

require 'structure.php';
require AUTOLOADER;

$client = new \Google_Client();
$client->setApplicationName("SV Inspection");
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');
$client->setAuthConfig(ENGINE_PATH.'credentials.json');

$service = new Google_Service_Sheets($client);
$spreadsheetId = "1Npo4AFnZ5zvdE5gUwWEe-IYD1zArhbE-SuNA-9kNifA";


function getValuesFromSheet(){
    global $service,$spreadsheetId,$structure;

    $keys = array_keys((array)$structure);
    $allSheetData = [];
    for($i=0; $i < count($keys);$i++){
        $range = $keys[$i]."!A1:W";
        $response = $service->spreadsheets_values->get($spreadsheetId, $range);
        $sheetData = $response->getValues();
        // array_push($allSheetData,$sheetData);
    
        $allSheetData = array_merge($allSheetData,$sheetData);
        // print_r(json_encode($sheetData));
        // echo '<br><br>';
        // print_r($response);
    }
    if(empty($allSheetData))
    {
        return false;
    }
    else
    {
        return $allSheetData;
    }

} 



?>