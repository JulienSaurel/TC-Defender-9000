<?php
require_once 'Model.php';

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    if ($action == 'list') {
        echo (json_encode(Model::selectAllScore()));

    } else if ($action == 'reg') {
        if (isset($_GET['pseudo']) && isset($_GET['score'])) {
            $pseudo = $_GET['pseudo'];
            $score = $_GET['score'];
            Model::insertScore($pseudo, $score);
        } else {
            die("Erreur, nombre de donnée insuffisante");
        }

    } else if ($action == 'low') {
        echo (json_encode(Model::lowerScore()));

    } else if ($action == 'select') {
        if (isset($_GET['pseudo'])) {
            $pseudo = $_GET['pseudo'];
            echo (json_encode(Model::select($pseudo)));
        } else {
            die("Erreur, nombre de donnée insuffisante");
        }

    } else if ($action == 'update') {
        if (isset($_GET['pseudo']) && isset($_GET['score'])) {
            $pseudo = $_GET['pseudo'];
            $score = $_GET['score'];
            Model::update($pseudo, $score);
        } else {
            die("Erreur, nombre de donnée insuffisante");
        }
    }
}