<?php
require_once File::build_path(array('controller', 'ControllerScore.php'));

if (isset($_GET['action'])) {
    if (in_array($_GET['action'], get_class_methods('ControllerScore'))) {
        $action = $_GET['action'];
        ControllerScore::$action();
    } else {
        die("Erreur : petit coquin");
    }
} else {
    die("Erreur : accés non autorisé !");
}