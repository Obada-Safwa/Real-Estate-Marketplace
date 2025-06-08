<?php

require_once "BaseDao.php";

class PropertyImagesDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("property_images");
    }
    
    /**
     * Get all images for a specific property
     * @param int $property_id - The ID of the property
     * @return array - List of property images
     */
    public function get_images_by_property_id($property_id) {
        return $this->query("SELECT * FROM property_images WHERE property_id = :property_id", 
                           ["property_id" => $property_id]);
    }

    public function get_by_property_id($property_id)
    {
        return $this->query(
            "SELECT * FROM property_images WHERE property_id = :property_id",
            [":property_id" => $property_id]
        );
    }
}
