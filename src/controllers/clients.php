<?php

// Include config file to load configurations
require '../config.php';

// Render twig template
echo $twig->render('pages/clients.html');

?>