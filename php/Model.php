<?php
require_once 'Conf.php';

class Model
{

    public static $pdo;

    public static function init_pdo()
    {
        $host = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login = Conf::getLogin();
        $pass = Conf::getPassword();
        try {
            // connexion à la base de données
            // le dernier argument sert à ce que toutes les chaines de charactères
            // en entrée et sortie de MySql soit dans le codage UTF-8
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    // Selectionne une ligne de score par pseudo de joueur
    // Renvoie false si le pseudo n'existe pas
    public static function select($nick)
    {
        try {
            $sql = 'SELECT * FROM tcd9k_score WHERE pseudo = :pseudo_tag';
            $rep_prep = self::$pdo->prepare($sql);
            $values = array(
                "pseudo_tag" => $nick,
            );
            $rep_prep->setFetchMode(PDO::FETCH_OBJ);
            $rep_prep->execute($values);
            $tab = $rep_prep->fetchAll();
            if (empty($tab)) {
                return false;
            } else {
                return $tab[0];
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    // Selectionne tout les scores et les renvois
    public static function selectAllScore()
    {
        try {
            $sql = 'SELECT pseudo, score FROM tcd9k_score ORDER BY score DESC LIMIT 10';
            $rep_prep = self::$pdo->prepare($sql);
            $rep_prep->setFetchMode(PDO::FETCH_OBJ);
            $rep_prep->execute();
            $tab = $rep_prep->fetchAll();
            return $tab;
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    // Modifie une ligne de score
    public static function update($nick, $score)
    {
        $idHI = Model::getIdHIbyNick($nick);
        if ($idHI) {
            try {
                $sql = 'UPDATE tcd9k_score SET score = :score_tag WHERE idHI = :idHI_tag';
                $rep_prep = self::$pdo->prepare($sql);
                $values = array(
                    "idHI_tag" => $idHI,
                    "score_tag" => $score,
                );
                $rep_prep->execute($values);
            } catch (PDOException $e) {
                echo $e->getMessage();
                die("Problème lors de la connexion à la base de données.");
            }
        }
    }

    // Ajoute un score à la base de donnée
    public static function insertScore($nick, $score)
    {
        try {
            $sql = 'INSERT INTO tcd9k_score (pseudo, score) VALUES (:nick_tag, :score_tag)';
            $rep_prep = self::$pdo->prepare($sql);
            $values = array(
                "nick_tag" => $nick,
                "score_tag" => $score,
            );
            $rep_prep->execute($values);
        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    // Retourne le score le plus bas des dix premiers de la base de donnée, false si base de donnée vide.
    public static function lowerScore()
    {
        $tab = Model::selectAllScore();
        if (empty($tab)) {
            return false;
        }

        if (isset($tab[9])) {
            return $tab[9]->score;
        } else {
            for ($i = 9; $i >= 0; $i--) {
                if (isset($tab[$i])) {
                    return $tab[$i];
                }
            }
        }
    }

    // Retourne l'id d'un pseudo ou false s'il n'existe pas
    public static function getIdHIbyNick($nick)
    {
        $score = Model::select($nick);
        if ($score) {
            return $score->idHI;
        }
        return false;
    }
}

// on initialise la connexion $pdo
Model::init_pdo();