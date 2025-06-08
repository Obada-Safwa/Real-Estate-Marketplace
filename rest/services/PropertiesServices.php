<?php

require_once "BaseServices.php";

class PropertiesServices extends BaseServices
{
    public function __construct()
    {
        parent::__construct(new PropertiesDao);
    }
}
