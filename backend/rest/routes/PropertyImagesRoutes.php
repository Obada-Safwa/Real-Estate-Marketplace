<?php

/**
 * @OA\Get(
 *      path="/property_images",
 *      tags={"Property Images"},
 *      summary="Get all property images",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="A list of property images",
 *           @OA\JsonContent(
 *               type="array",
 *               @OA\Items(
 *                   @OA\Property(property="id", type="integer", example=1),
 *                   @OA\Property(property="property_id", type="integer", example=1),
 *                   @OA\Property(property="image_url", type="string", example="images/apartment1.jpg"),
 *                   @OA\Property(property="uploaded_at", type="string", format="date-time", example="2025-03-24 16:05:43")
 *               )
 *           )
 *       )
 * )
 */
Flight::route("GET /property_images", function () {
    Flight::json(Flight::property_images_service()->get_all());
});

/**
 * @OA\Get(
 *      path="/property_images/{id}",
 *      tags={"Property Images"},
 *      summary="Get a property image by ID",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the property image",
 *          @OA\Schema(type="integer", example=1)
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Property image data",
 *           @OA\JsonContent(
 *               @OA\Property(property="id", type="integer", example=1),
 *               @OA\Property(property="property_id", type="integer", example=1),
 *               @OA\Property(property="image_url", type="string", example="images/apartment1.jpg"),
 *               @OA\Property(property="uploaded_at", type="string", format="date-time", example="2025-03-24 16:05:43")
 *           )
 *       )
 * )
 */
Flight::route("GET /property_images/@id", function ($id) {
    Flight::json(Flight::property_images_service()->get_by_id($id, "id"));
});

/**
 * @OA\Post(
 *      path="/property_images",
 *      tags={"Property Images"},
 *      summary="Add a new property image",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\JsonContent(
 *              @OA\Property(property="property_id", type="integer", example=1),
 *              @OA\Property(property="image_url", type="string", example="images/apartment1.jpg")
 *          )
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Property image successfully added"
 *       )
 * )
 */
Flight::route("POST /property_images", function () {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::property_images_service()->add($request));
});

/**
 * @OA\Delete(
 *      path="/property_images/{id}",
 *      tags={"Property Images"},
 *      summary="Delete a property image",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the property image to delete",
 *          @OA\Schema(type="integer", example=1)
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Property image successfully deleted"
 *       )
 * )
 */
Flight::route("DELETE /property_images/@id", function ($id) {
    Flight::json(Flight::property_images_service()->delete($id, "id"));
});

/**
 * @OA\Put(
 *      path="/property_images/{id}",
 *      tags={"Property Images"},
 *      summary="Update a property image",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the property image to update",
 *          @OA\Schema(type="integer", example=1)
 *      ),
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\JsonContent(
 *              @OA\Property(property="image_url", type="string", example="images/new_image.jpg")
 *          )
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Property image successfully updated"
 *       )
 * )
 */
Flight::route("PUT /property_images/@id", function ($id) {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::property_images_service()->update($request, $id, "id"));
});
