<?php

class Conf
{
    private static $database = array(
        'hostname' => 'localhost',
        'database' => 'combess',
        'login' => 'root',
        'password' => '',
    );

    public static function getLogin()
    {
        return self::$database['login'];
    }

    public static function getHostname()
    {
        return self::$database['hostname'];
    }

    public static function getDatabase()
    {
        return self::$database['database'];
    }

    public static function getPassword()
    {
        return self::$database['password'];
    }
}