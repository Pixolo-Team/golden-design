<?php

// Include config file to load configurations
require '../config.php';

// Get the params from the url 
$category = isset($_GET["c"]) ? $_GET["c"] : null;
$webdata = file_get_contents(DATA_PATH . "data.json");
$webdata = json_decode($webdata);

$expertise = new stdClass();
$filters = array();
$projects = array();
// Set up projects 
foreach ($webdata->expertise as $exp) {
    if ($category && $category == $exp->id) {
        $expertise = $exp;
    }
    $filters[$exp->id] = (object)[
        "id" => $exp->id,
        "name" => $exp->name,
        "shouldShow" => false
    ];
}

foreach ($webdata->projects as $project) {
    if (!isset($category) || $category == $project->category) {
        array_push($projects, $project);
    }
    if (isset($filters[$project->category]) && !$filters[$project->category]->shouldShow) {
        $filters[$project->category]->shouldShow = true;
    }
}

// Render twig template
echo $twig->render('pages/projects.html', ["webdata" => $webdata, "category" => $category, "filters" => $filters, "projects" => $projects, "expertise" => $expertise]);
