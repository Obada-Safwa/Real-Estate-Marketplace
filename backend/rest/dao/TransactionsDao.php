<?php

require_once "BaseDao.php";

class TransactionsDao extends BaseDao
{

    public function __construct()
    {
        parent::__construct("Transactions");
    }
    public function get_total_amount_spent_by_user($user_id)
    {
        return $this->query(
            "SELECT SUM(amount) as total_spent FROM Transactions WHERE buyer_id = :buyer_id AND payment_status = 'completed'",
            [":buyer_id" => $user_id]
        );
    }

    public function get_transactions_by_user_id($user_id)
    {
        return $this->query(
            "SELECT * FROM Transactions WHERE buyer_id = :user_id OR seller_id = :user_id",
            [":user_id" => $user_id]
        );
    }
}
