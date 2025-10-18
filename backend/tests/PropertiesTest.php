<?php
require_once __DIR__ . "/../rest/config.php";

use PHPUnit\Framework\TestCase;

class PropertiesTest extends TestCase
{
    private string $baseUrl = "http://localhost/Real-Estate-Marketplace/backend";
    private string $token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoyMywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJwcm9maWxlX3BpY3R1cmUiOm51bGwsImNyZWF0ZWRfYXQiOiIyMDI1LTEwLTAyIDEwOjEzOjI4In0sImlhdCI6MTc2MDgwODYxOCwiZXhwIjoxNzYwOTMxMDE4fQ.QKWEavmRrvf68dLcOsf_2uT5sc5qUG2GCCcR4jk1cNY";


    public function testGetAllProperties()
    {
        $url = $this->baseUrl . "/properties";

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                "accept: application/json",
                "Authentication: " . $this->token
            ]
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        // Show raw response (like console.log)
        echo "\n🔍 Response from API:\n" . $response . "\n";

        // Check if cURL worked
        $this->assertNotFalse($response, "❌ cURL request failed: $error");

        // Check HTTP status
        $this->assertEquals(
            200,
            $httpCode,
            "❌ Unexpected HTTP code: $httpCode\nFull response:\n$response"
        );

        // Decode JSON
        $data = json_decode($response, true);

        // Print what type of data was returned
        echo "📦 Type of decoded response: " . gettype($data) . "\n";

        // Validate JSON
        $this->assertNotNull($data, "❌ Response is not valid JSON");

        // Validate array
        $this->assertIsArray($data, "❌ Response should be an array, got: " . gettype($data));

        // If array is empty or filled, show it clearly
        if (empty($data)) {
            echo "⚠️ Response is an empty array.\n";
        } else {
            echo "✅ Response contains " . count($data) . " items.\n";
            echo "🧩 First property sample:\n";
            print_r($data[0]);
        }

        // Validate structure if not empty
        if (!empty($data)) {
            $this->assertArrayHasKey('id', $data[0], "❌ Missing 'id' field in first property");
        }
    }
}
