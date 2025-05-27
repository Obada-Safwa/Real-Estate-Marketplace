<?php

require "vendor/autoload.php";

require_once 'rest/services/AuthServices.php';
require_once "rest/services/UsersServices.php";
require_once "rest/services/PropertiesServices.php";
require_once "rest/services/ReportsServices.php";
require_once "rest/services/PropertyImagesServices.php";
require_once "rest/services/TransactionsServices.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once 'rest/routes/AuthRoutes.php';
require_once 'rest/routes/UsersRoutes.php';
require_once 'rest/routes/PropertiesRoutes.php';
require_once 'rest/routes/ReportsRoutes.php';
require_once 'rest/routes/PropertyImagesRoutes.php';
require_once 'rest/routes/TransactionsRoutes.php';


require_once "rest/dao/AuthDao.php";
require_once "rest/dao/UsersDao.php";
require_once "rest/dao/PropertiesDao.php";
require_once "rest/dao/TransactionsDao.php";
require_once "rest/dao/ReportsDao.php";
require_once "rest/dao/PropertyImagesDao.php";



Flight::register("auth_service", "AuthServices");
Flight::register("users_service", "UsersServices");
Flight::register("properties_service", "PropertiesServices");
Flight::register("reports_service", "ReportsServices");
Flight::register("transactions_service", "TransactionsServices");
Flight::register("property_images_service", "PropertyImagesServices");

Flight::route('/*', function () {
    if (
        strpos(Flight::request()->url, '/auth/login') === 0 ||
        strpos(Flight::request()->url, '/auth/register') === 0
    ) {
        return TRUE;
    } else {
        try {
            $token = Flight::request()->getHeader("Authentication");
            if (!$token)
                Flight::halt(401, "Missing authentication header");


            $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));


            Flight::set('user', $decoded_token->user);
            Flight::set('jwt_token', $token);
            return TRUE;
        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }
});


Flight::start();
