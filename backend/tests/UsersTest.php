<?php
require_once __DIR__ . "/../rest/config.php";

use PHPUnit\Framework\TestCase;

class UsersTest extends TestCase
{
    private string $baseUrl = "http://localhost/Real-Estate-Marketplace/backend";
    private string $token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoyMywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJwcm9maWxlX3BpY3R1cmUiOm51bGwsImNyZWF0ZWRfYXQiOiIyMDI1LTEwLTAyIDEwOjEzOjI4In0sImlhdCI6MTc2MTA1MjczOSwiZXhwIjoxNzYxMTc1MTM5fQ.mT5NLRyby582ILRUc2kVjoOrEvZgXxmfRCAmQRRwuyo";

    public function testEditUserEmail()
    {
        $userId = 36; // ID of the user to update
        $newEmail = "newadmin@example.com";

        $url = $this->baseUrl . "/users/" . $userId;

        $payload = json_encode([
            "email" => $newEmail
        ]);

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => "PUT",
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => [
                "Content-Type: application/json",
                "Accept: application/json",
                "Authentication: " . $this->token
            ]
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        // Show raw response for debugging
        echo "\nResponse from API:\n" . $response . "\n";

        // Assert request success
        $this->assertNotFalse($response, "cURL request failed: $error");
        $this->assertEquals(
            200,
            $httpCode,
            "Unexpected HTTP code: $httpCode\nFull response:\n$response"
        );

        // Decode JSON
        $data = json_decode($response, true);
        $this->assertNotNull($data, "Response is not valid JSON");
        $this->assertIsArray($data, "Response should be an array");

        // Verify updated email
        $this->assertArrayHasKey('email', $data, "Response missing 'email' field");
        $this->assertEquals($newEmail, $data['email'], "Email was not updated correctly");
    }
}
