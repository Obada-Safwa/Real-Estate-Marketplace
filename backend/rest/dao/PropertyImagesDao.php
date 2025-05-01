<?php

require_once "BaseDao.php";

class PropertyImagesDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("property_images");
    }

    public function get_by_property_id($property_id)
    {
        return $this->query(
            "SELECT * FROM property_images WHERE property_id = :property_id",
            [":property_id" => $property_id]
        );
    }
}
