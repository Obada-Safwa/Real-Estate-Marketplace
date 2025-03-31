<?php

require "vendor/autoload.php";


require_once "rest/services/UsersServices.php";
require_once "rest/services/PropertiesServices.php";
require_once "rest/services/ReportsServices.php";
require_once "rest/services/PropertyImagesServices.php";
require_once "rest/services/TransactionsServices.php";


require_once 'rest/routes/UsersRoutes.php';
require_once 'rest/routes/PropertiesRoutes.php';
require_once 'rest/routes/ReportsRoutes.php';
require_once 'rest/routes/PropertyImagesRoutes.php';
require_once 'rest/routes/TransactionsRoutes.php';


require_once "rest/dao/UsersDao.php";
require_once "rest/dao/PropertiesDao.php";
require_once "rest/dao/TransactionsDao.php";
require_once "rest/dao/ReportsDao.php";
require_once "rest/dao/PropertyImagesDao.php";



Flight::register("users_service", "UsersServices");
Flight::register("properties_service", "PropertiesServices");
Flight::register("reports_service", "ReportsServices");
Flight::register("transactions_service", "TransactionsServices");
Flight::register("property_images_service", "PropertyImagesServices");


Flight::start();
