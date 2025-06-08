<?php

require_once "BaseServices.php";

class ReportsServices extends BaseServices {
    public function __construct() {
        parent::__construct(new ReportsDao);
    }
}
