<?php
// Include config to load all the configs
require '../../config.php';

// Engine file include
include ENGINE_PATH . "sheet-data.php";

$clientJson;
$jsonPath = DATA_PATH . "data.json";

$sheetData = getValuesFromSheet();
if ($sheetData) {
    include ENGINE_PATH . "sheet-to-json.php";
    $clientJson = getDataJson($sheetData);
    //Save content in json file 
    file_put_contents($jsonPath, json_encode($clientJson));
    echo "<center><b>Hurray! Data Generated...</b></center>";
} else {
    echo "Cannot convert sheet to json";
}

?>
