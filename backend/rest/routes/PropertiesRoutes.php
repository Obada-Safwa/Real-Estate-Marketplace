<?php

/**
 * @OA\Get(
 *      path="/properties",
 *      tags={"Properties"},
 *      summary="Get all properties",
 *      security={
 *          {"ApiKey": {}}
 *      },
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
 *      security={
 *          {"ApiKey": {}}
 *      },
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
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\JsonContent(
 *              required={"title", "description", "price", "type", "bedrooms", "bathrooms", "area", "category", "location"},
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
 *              @OA\Property(property="image_url", type="string", example="available"),
 *              @OA\Property(property="created_at", type="string", format="date-time", example="2025-03-24 16:05:43")
 *          )
 *      ),
 *      @OA\Response(
 *           response=201,
 *           description="Property successfully created"
 *       )
 * )
 */
Flight::route(
    "POST /properties",
    function () {
        $request = Flight::request()->data->getData();
        $user = Flight::get('user');
        $request['user_id'] = $user->id;
        $request['status'] = 'available';
        Flight::json(Flight::properties_service()->addProperty($request));
    }
);


/**
 * @OA\Delete(
 *      path="/properties/{id}",
 *      tags={"Properties"},
 *      summary="Delete a property",
 *      security={
 *          {"ApiKey": {}}
 *      },
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
    $user = Flight::get('user');

    $property = Flight::properties_service()->get_by_id($id, "id");
    // Flight::json($property[0]['user_id']);
    // Check if property exists
    // if (!$property) {
    //     Flight::json(["error" => "Property not found"], 404);
    //     return;
    // }

    // If $property is returned as an array, cast it to object
    // if (is_array($property)) {
    //     $property = (object) $property;
    // }

    // Check authorization
    if (
        $user->id ==
        $property[0]['user_id'] || $user->role === "admin"
    ) {
        Flight::properties_service()->delete($id, "id");
        Flight::json(["success" => "Property deleted"]);
    } else {
        Flight::json(["error" => "Unauthorized"], 403);
    }
});



/**
 * @OA\Put(
 *      path="/properties/{id}",
 *      tags={"Properties"},
 *      summary="Update a property",
 *      security={
 *          {"ApiKey": {}}
 *      },
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
 *      security={
 *          {"ApiKey": {}}
 *      },
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
        if ($user) {
            unset($user[0]['password']);
            $property['user_details'] = $user;
        }
    }
    Flight::json($property);
});

/**
 * @OA\Get(
 *     path="/properties/reports/{id}",
 *     summary="Get reports for a specific property",
 *     description="Fetches all reports related to a specific property by its ID.",
 *     tags={"Properties"},
 *     security={
 *          {"ApiKey": {}}
 *      },
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="The ID of the property to fetch reports for",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="List of reports for the property",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 type="object",
 *                 @OA\Property(property="report_id", type="integer", example=12),
 *                 @OA\Property(property="report_status", type="string", example="reviewed"),
 *                 @OA\Property(property="report_reason", type="string", example="Inaccurate description"),
 *                 @OA\Property(property="property_id", type="integer", example=45),
 *                 @OA\Property(property="user_published_property", type="integer", example=23),
 *                 @OA\Property(property="user_did_report", type="integer", example=38)
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Property or reports not found"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error"
 *     )
 * )
 */
Flight::route("GET /properties/reports/@id", function ($id) {
    Flight::json(Flight::properties_service()->get_report_with_property($id));
});
