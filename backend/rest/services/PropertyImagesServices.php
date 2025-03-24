<?php

require_once "BaseServices.php";

class PropertyImagesServices extends BaseServices {
    public function __construct() {
        parent::__construct(new PropertyImagesDao);
    }
}
