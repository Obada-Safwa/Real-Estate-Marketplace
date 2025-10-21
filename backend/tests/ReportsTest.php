<?php
require_once __DIR__ . "/../rest/config.php";

use PHPUnit\Framework\TestCase;

class ReportsTest extends TestCase
{
    private string $baseUrl = "http://localhost/Real-Estate-Marketplace/backend";
    private string $token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoyMywibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJwcm9maWxlX3BpY3R1cmUiOm51bGwsImNyZWF0ZWRfYXQiOiIyMDI1LTEwLTAyIDEwOjEzOjI4In0sImlhdCI6MTc2MTA1MjczOSwiZXhwIjoxNzYxMTc1MTM5fQ.mT5NLRyby582ILRUc2kVjoOrEvZgXxmfRCAmQRRwuyo";


    /**
     * Test creating a new report (POST /reports)
     */
    public function testCreateReport()
    {
        $url = $this->baseUrl . "/reports";

        $payload = json_encode([
            "user_id" => 23,
            "property_id" => 20,
            "reason" => "This property contains incorrect information.",
            "status" => "pending"
        ]);

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
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

        echo "\n[POST /reports] Response:\n" . $response . "\n";

        $this->assertNotFalse($response, "cURL request failed: $error");
        $this->assertTrue(
            in_array($httpCode, [200, 201]),
            "Unexpected HTTP code: $httpCode\nFull response:\n$response"
        );

        $data = json_decode($response, true);
        $this->assertNotNull($data, "Response is not valid JSON");
        $this->assertIsArray($data, "Response should be an array");

        // Check basic structure
        $this->assertArrayHasKey('id', $data, "Missing 'id' field in response");
        $this->assertArrayHasKey('user_id', $data, "Missing 'user_id' field in response");
        $this->assertArrayHasKey('property_id', $data, "Missing 'property_id' field in response");
        $this->assertArrayHasKey('reason', $data, "Missing 'reason' field in response");
        $this->assertArrayHasKey('status', $data, "Missing 'status' field in response");

        // Ensure the report status is pending
        $this->assertEquals("pending", $data['status'], "Report status was not set to 'pending'");
    }


    /**
     * Test updating a report status (PATCH /reports/{status}/{id})
     */
    public function testPatchReportStatus()
    {
        $reportId = 22;            // ID of the report to update
        $newStatus = "dismissed";  // New status to set
        $url = $this->baseUrl . "/reports/{$newStatus}/{$reportId}";

        $payload = json_encode([
            "status" => $newStatus
        ]);

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => "PATCH",
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

        echo "\n[PATCH /reports/{$newStatus}/{$reportId}] Response:\n" . $response . "\n";

        $this->assertNotFalse($response, "cURL request failed: $error");
        $this->assertEquals(
            200,
            $httpCode,
            "Unexpected HTTP code: $httpCode\nFull response:\n$response"
        );

        $data = json_decode($response, true);
        $this->assertNotNull($data, "Response is not valid JSON");
        $this->assertIsArray($data, "Response should be an array");

        if (isset($data['status'])) {
            $this->assertEquals($newStatus, $data['status'], "Report status was not updated correctly");
        }
    }
}
