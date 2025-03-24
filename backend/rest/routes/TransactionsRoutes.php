<?php


Flight::route("GET /transactions" , function() {
    Flight::json(Flight::transactions_service()->get_all());
});

Flight::route("GET /transactions/@id", function($id) {
    Flight::json(Flight::transactions_service()->get_by_id($id, "transactions_id"));
});

Flight::route("POST /transactions" , function() {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::transactions_service()->add($request));
});

Flight::route("DELETE /transactions/@id" , function($id) {
    Flight::json(Flight::transactions_service()->delete($id, "transactions_id"));
});

Flight::route("PUT /transactions/@id" , function($id) {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::transactions_service()->update($request,$id,"transactions_id"));
});
?>  