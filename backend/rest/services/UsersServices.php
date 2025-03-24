<?php

require_once "BaseServices.php";

class UsersServices extends BaseServices {
    public function __construct() {
        parent::__construct(new UsersDao);
    }
}
