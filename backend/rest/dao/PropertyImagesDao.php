<?php

require_once "BaseDao.php";

class PropertyImagesDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("property_images");
    }
}
