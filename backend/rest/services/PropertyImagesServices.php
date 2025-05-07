<?php

require_once "BaseServices.php";

class PropertyImagesServices extends BaseServices {
    public function __construct() {
        parent::__construct(new PropertyImagesDao);
    }
    
    /**
     * Get all images for a specific property
     * @param int $property_id - The ID of the property
     * @return array - List of property images
     */
    public function get_images_by_property($property_id) {
        return $this->dao->get_images_by_property_id($property_id);
    }
}
