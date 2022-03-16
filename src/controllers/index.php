<?php

// Include config file to load configurations
require '../config.php';

$webdata = file_get_contents(DATA_PATH."data.json");
$webdata = json_decode($webdata);
// Render twig template
echo $twig->render('pages/index.html',["webdata"=>$webdata]);
