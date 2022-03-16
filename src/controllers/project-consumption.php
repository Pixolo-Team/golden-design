<?php

// Include config file to load configurations
require '../config.php';

$webdata = file_get_contents(DATA_PATH . "data.json");
$webdata = json_decode($webdata);
$id = isset($_GET['p']) ? $_GET['p'] : null;
if ($id) {
    $selectedProject;
    // Find the project with the passed id
    foreach ($webdata->projects as $project) {
        if ($project->id == $id) {
            $selectedProject = $project;
            break;
        }
    }
    // Render twig template
    echo $twig->render('pages/project-consumption.html', ["project" => $selectedProject]);
} else {
    header("Location: https://goldendesigninteriors.com/projects");
}
