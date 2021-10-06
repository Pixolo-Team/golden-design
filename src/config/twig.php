<?php

// echo AUTOLOADER;
require_once AUTOLOADER;

$loader = new \Twig\Loader\FilesystemLoader(TEMPLATES_PATH);

$options = array(
    'strict_variables' => false,
    'debug' => false,
    'cache'=> false
);

$twig = new Twig_Environment($loader, $options);
?>