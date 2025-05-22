<?php

/**
 * @OA\Get(
 *      path="/properties",
 *      tags={"Properties"},
 *      summary="Get all properties",
 *      @OA\Response(
 *           response=200,
 *           description="A list of properties",
 *           @OA\JsonContent(
 *               type="array",
 *               @OA\Items(
 *                   @OA\Property(property="id", type="integer", example=1),
 *                   @OA\Property(property="user_id", type="integer", example=1),
 *                   @OA\Property(property="title", type="string", example="Luxury Apartment"),
 *                   @OA\Property(property="description", type="string", example="A beautiful 3-bedroom apartment in the city center."),
 *                   @OA\Property(property="price", type="string", example="250000.00"),
 *                   @OA\Property(property="type", type="string", example="sale"),
 *                   @OA\Property(property="bedrooms", type="integer", example=3),
 *                   @OA\Property(property="bathrooms", type="integer", example=2),
 *                   @OA\Property(property="area", type="number", format="float", example=120.50),
 *                   @OA\Property(property="category", type="string", example="apartment"),
 *                   @OA\Property(property="location", type="string", example="New York, NY"),
 *                   @OA\Property(property="status", type="string", example="available"),
 *                   @OA\Property(property="created_at", type="string", format="date-time", example="2025-03-24 16:05:43")
 *               )
 *           )
 *       )
 * )
 */
Flight::route("GET /properties", function () {
    Flight::json(Flight::properties_service()->get_all());
});

/**
 * @OA\Get(
 *      path="/properties/{id}",
 *      tags={"Properties"},
 *      summary="Get a property by ID",
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the property",
 *          @OA\Schema(type="integer", example=1)
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Property details",
 *           @OA\JsonContent(
 *               type="object",
 *               @OA\Property(property="id", type="integer", example=1),
 *               @OA\Property(property="user_id", type="integer", example=1),
 *               @OA\Property(property="title", type="string", example="Luxury Apartment"),
 *               @OA\Property(property="description", type="string", example="A beautiful 3-bedroom apartment in the city center."),
 *               @OA\Property(property="price", type="string", example="250000.00"),
 *               @OA\Property(property="type", type="string", example="sale"),
 *               @OA\Property(property="bedrooms", type="integer", example=3),
 *               @OA\Property(property="bathrooms", type="integer", example=2),
 *               @OA\Property(property="area", type="number", format="float", example=120.50),
 *               @OA\Property(property="category", type="string", example="apartment"),
 *               @OA\Property(property="location", type="string", example="New York, NY"),
 *               @OA\Property(property="status", type="string", example="available"),
 *               @OA\Property(property="created_at", type="string", format="date-time", example="2025-03-24 16:05:43")
 *           )
 *       )
 * )
 */
Flight::route("GET /properties/@id", function ($id) {
    Flight::json(Flight::properties_service()->get_by_id($id, "id"));
});

/**
 * @OA\Post(
 *      path="/properties",
 *      tags={"Properties"},
 *      summary="Create a new property",
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\JsonContent(
 *              required={"user_id", "title", "description", "price", "type", "bedrooms", "bathrooms", "area", "category", "location"},
 *              @OA\Property(property="user_id", type="integer", example=1),
 *              @OA\Property(property="title", type="string", example="Luxury Apartment"),
 *              @OA\Property(property="description", type="string", example="A beautiful 3-bedroom apartment in the city center."),
 *              @OA\Property(property="price", type="string", example="250000.00"),
 *              @OA\Property(property="type", type="string", example="sale"),
 *              @OA\Property(property="bedrooms", type="integer", example=3),
 *              @OA\Property(property="bathrooms", type="integer", example=2),
 *              @OA\Property(property="area", type="number", format="float", example=120.50),
 *              @OA\Property(property="category", type="string", example="apartment"),
 *              @OA\Property(property="location", type="string", example="New York, NY"),
 *              @OA\Property(property="status", type="string", example="available"),
 *              @OA\Property(property="created_at", type="string", format="date-time", example="2025-03-24 16:05:43")
 *          )
 *      ),
 *      @OA\Response(
 *           response=201,
 *           description="Property successfully created"
 *       )
 * )
 */
Flight::route("POST /properties", function () {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::properties_service()->add($request));
});

/**
 * @OA\Delete(
 *      path="/properties/{id}",
 *      tags={"Properties"},
 *      summary="Delete a property",
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the property to delete",
 *          @OA\Schema(type="integer", example=1)
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Property successfully deleted"
 *       )
 * )
 */
Flight::route("DELETE /properties/@id", function ($id) {
    Flight::json(Flight::properties_service()->delete($id, "id"));
});

/**
 * @OA\Put(
 *      path="/properties/{id}",
 *      tags={"Properties"},
 *      summary="Update a property",
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the property to update",
 *          @OA\Schema(type="integer", example=1)
 *      ),
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\JsonContent(
 *              @OA\Property(property="title", type="string", example="Updated Title"),
 *              @OA\Property(property="price", type="string", example="300000.00"),
 *              @OA\Property(property="type", type="string", example="rent"),
 *              @OA\Property(property="bedrooms", type="integer", example=4),
 *              @OA\Property(property="bathrooms", type="integer", example=3),
 *              @OA\Property(property="area", type="number", format="float", example=150.75),
 *              @OA\Property(property="status", type="string", example="sold"),
 *              @OA\Property(property="description", type="string", example="Updated description of the property")
 *          )
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Property successfully updated"
 *       )
 * )
 */
Flight::route("PUT /properties/@id", function ($id) {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::properties_service()->update($request, $id, "id"));
});

/**
 * @OA\Get(
 *      path="/properties/details/{id}",
 *      tags={"Properties"},
 *      summary="Get detailed property information by ID",
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the property",
 *          @OA\Schema(type="integer", example=1)
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Property details with additional information",
 *           @OA\JsonContent(
 *               type="object",
 *               @OA\Property(property="id", type="integer", example=1),
 *               @OA\Property(property="user_id", type="integer", example=1),
 *               @OA\Property(property="title", type="string", example="Luxury Apartment"),
 *               @OA\Property(property="description", type="string", example="A beautiful 3-bedroom apartment in the city center."),
 *               @OA\Property(property="price", type="string", example="250000.00"),
 *               @OA\Property(property="type", type="string", example="sale"),
 *               @OA\Property(property="bedrooms", type="integer", example=3),
 *               @OA\Property(property="bathrooms", type="integer", example=2),
 *               @OA\Property(property="area", type="number", format="float", example=120.50),
 *               @OA\Property(property="category", type="string", example="apartment"),
 *               @OA\Property(property="location", type="string", example="New York, NY"),
 *               @OA\Property(property="status", type="string", example="available"),
 *               @OA\Property(property="created_at", type="string", format="date-time", example="2025-03-24 16:05:43"),
 *               @OA\Property(property="user_details", type="object"),
 *               @OA\Property(property="images", type="array", @OA\Items(type="object"))
 *           )
 *       ),
 *       @OA\Response(
 *           response=404,
 *           description="Property not found"
 *       )
 * )
 */
Flight::route("GET /properties/details/@id", function ($id) {
    $property = Flight::properties_service()->get_by_id($id, "id");

    if (!$property) {
        Flight::json(["message" => "Property not found"], 404);
        return;
    }

    // Get property images if available
    $images = Flight::property_images_service()->get_by_id($id, "property_id");
    $property['images'] = $images;

    // Get user/seller information if available
    if (isset($property["0"]['user_id'])) {
        $user = Flight::users_service()->get_by_id($property["0"]['user_id'], "id");
        $property['user_details'] = $user;
        // Remove sensitive information
        if ($user) {
            // unset($user['password']);
            $property['user_details'] = $user;
        }
    }

    Flight::json($property);
});
