<?php
require_once File::build_path(array('model', 'Model.php'));

class ControllerScore
{

    public static function readAll()
    {
        echo (json_encode(Model::selectAllScore()));
    }

    public static function create()
    {
        if (isset($_GET['pseudo']) && isset($_GET['score'])) {
            Model::insertScore($_GET['pseudo'], $_GET['score']);
        } else {
            die("Erreur, nombre de donnée insuffisante");
        }
    }

    public static function low()
    {
        echo (json_encode(Model::lowerScore()));
    }

    public static function select()
    {
        if (isset($_GET['pseudo'])) {
            echo (json_encode(Model::select($_GET['pseudo'])));
        } else {
            die("Erreur, nombre de donnée insuffisante");
        }
    }

    public static function update()
    {
        if (isset($_GET['pseudo']) && isset($_GET['score'])) {
            Model::update($_GET['pseudo'], $_GET['score']);
        } else {
            die("Erreur, nombre de donnée insuffisante");
        }
    }

    public static function cScores()
    {
        echo (json_encode(Model::countScores()));
    }
}
