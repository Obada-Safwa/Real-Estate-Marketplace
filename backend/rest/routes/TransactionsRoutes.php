<?php

/**
 * @OA\Get(
 *      path="/transactions",
 *      tags={"Transactions"},
 *      summary="Get all transactions",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="A list of transactions",
 *           @OA\JsonContent(
 *               type="array",
 *               @OA\Items(
 *                   @OA\Property(property="id", type="integer", example=1),
 *                   @OA\Property(property="buyer_id", type="integer", example=2),
 *                   @OA\Property(property="seller_id", type="integer", example=1),
 *                   @OA\Property(property="property_id", type="integer", example=1),
 *                   @OA\Property(property="amount", type="string", example="250000.00"),
 *                   @OA\Property(property="transaction_date", type="string", format="date-time", example="2025-03-24 16:05:43"),
 *                   @OA\Property(property="payment_status", type="string", example="completed")
 *               )
 *           )
 *       )
 * )
 */
Flight::route("GET /transactions", function () {
    Flight::json(Flight::transactions_service()->get_all());
});

/**
 * @OA\Get(
 *      path="/transactions/{id}",
 *      tags={"Transactions"},
 *      summary="Get a transaction by ID",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the transaction",
 *          @OA\Schema(type="integer", example=1)
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Transaction details",
 *           @OA\JsonContent(
 *               type="object",
 *               @OA\Property(property="id", type="integer", example=1),
 *               @OA\Property(property="buyer_id", type="integer", example=2),
 *               @OA\Property(property="seller_id", type="integer", example=1),
 *               @OA\Property(property="property_id", type="integer", example=1),
 *               @OA\Property(property="amount", type="string", example="250000.00"),
 *               @OA\Property(property="transaction_date", type="string", format="date-time", example="2025-03-24 16:05:43"),
 *               @OA\Property(property="payment_status", type="string", example="completed")
 *           )
 *       )
 * )
 */
Flight::route("GET /transactions/@id", function ($id) {
    Flight::json(Flight::transactions_service()->get_by_id($id, "id"));
});

/**
 * @OA\Post(
 *      path="/transactions",
 *      tags={"Transactions"},
 *      summary="Create a new transaction",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\JsonContent(
 *              required={"buyer_id", "seller_id", "property_id", "amount", "transaction_date", "payment_status"},
 *              @OA\Property(property="buyer_id", type="integer", example=2),
 *              @OA\Property(property="seller_id", type="integer", example=1),
 *              @OA\Property(property="property_id", type="integer", example=1),
 *              @OA\Property(property="amount", type="string", example="250000.00"),
 *              @OA\Property(property="transaction_date", type="string", format="date-time", example="2025-03-24 16:05:43"),
 *              @OA\Property(property="payment_status", type="string", example="completed")
 *          )
 *      ),
 *      @OA\Response(
 *           response=201,
 *           description="Transaction successfully created"
 *       )
 * )
 */
Flight::route("POST /transactions", function () {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::transactions_service()->add($request));
});

/**
 * @OA\Delete(
 *      path="/transactions/{id}",
 *      tags={"Transactions"},
 *      summary="Delete a transaction",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the transaction to delete",
 *          @OA\Schema(type="integer", example=1)
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Transaction successfully deleted"
 *       )
 * )
 */
Flight::route("DELETE /transactions/@id", function ($id) {
    Flight::json(Flight::transactions_service()->delete($id, "id"));
});

/**
 * @OA\Put(
 *      path="/transactions/{id}",
 *      tags={"Transactions"},
 *      summary="Update a transaction",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the transaction to update",
 *          @OA\Schema(type="integer", example=1)
 *      ),
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\JsonContent(
 *              @OA\Property(property="amount", type="string", example="260000.00"),
 *              @OA\Property(property="payment_status", type="string", example="pending")
 *          )
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Transaction successfully updated"
 *       )
 * )
 */
Flight::route("PUT /transactions/@id", function ($id) {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::transactions_service()->update($request, $id, "id"));
});
