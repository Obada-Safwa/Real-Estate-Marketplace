<?php

require_once "BaseServices.php";

class TransactionsServices extends BaseServices {
    public function __construct() {
        parent::__construct(new TransactionsDao);
    }
}
