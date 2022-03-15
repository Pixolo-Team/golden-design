<?php

// Include config file to load configurations
require '../config.php';

// Get the params from the url 
$category = isset($_GET["c"]) ? $_GET["c"] : null;
$webdata = file_get_contents(DATA_PATH . "data.json");
$webdata = json_decode($webdata);
// Render twig template
echo $twig->render('pages/projects.html', ["webdata" => $webdata, "category" => $category]);
