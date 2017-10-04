<?php

require_once __DIR__ . '/vendor/autoload.php';
foreach (glob("_controller/*.php") as $filename) { require_once $filename; }

/**************** var ************************/

$klein = new \Klein\Klein();

/**************** routes ************************/

$klein->respond('GET', '/', function () {
    $home = new Home;
    $home->render("/home");
});

/**************** main ************************/

$klein->dispatch();
