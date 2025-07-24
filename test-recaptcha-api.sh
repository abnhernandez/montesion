#!/bin/bash

# reCAPTCHA Enterprise API Testing Script
# This script demonstrates how to test the reCAPTCHA Enterprise API manually

# Variables - Replace these with your actual values
API_KEY="your_api_key_here"
PROJECT_ID="crack-muse-466920-q8"
TOKEN="your_generated_token_here"
USER_ACTION="SUBMIT_FORM"
SITE_KEY="6LewOY4rAAAAAHFM3cVheqX82ITHy0JPNhTj11_B"

# Create the request body
cat > request.json << EOF
{
  "event": {
    "token": "$TOKEN",
    "expectedAction": "$USER_ACTION",
    "siteKey": "$SITE_KEY",
    "userIpAddress": "192.168.1.1"
  }
}
EOF

echo "📝 Request body created in request.json:"
cat request.json
echo ""

# Make the API call
echo "🚀 Sending request to reCAPTCHA Enterprise API..."
echo "URL: https://recaptchaenterprise.googleapis.com/v1/projects/$PROJECT_ID/assessments?key=$API_KEY"
echo ""

curl -X POST \
  "https://recaptchaenterprise.googleapis.com/v1/projects/$PROJECT_ID/assessments?key=$API_KEY" \
  -H "Content-Type: application/json" \
  -d @request.json \
  -v

echo ""
echo "✅ Request completed!"

# PowerShell version for Windows
echo ""
echo "🪟 PowerShell equivalent:"
echo ""
cat << 'EOF'
# PowerShell script for Windows users
$API_KEY = "your_api_key_here"
$PROJECT_ID = "crack-muse-466920-q8"
$TOKEN = "your_generated_token_here"
$USER_ACTION = "SUBMIT_FORM"
$SITE_KEY = "6LewOY4rAAAAAHFM3cVheqX82ITHy0JPNhTj11_B"

$requestBody = @{
    event = @{
        token = $TOKEN
        expectedAction = $USER_ACTION
        siteKey = $SITE_KEY
        userIpAddress = "192.168.1.1"
    }
} | ConvertTo-Json -Depth 3

$headers = @{
    "Content-Type" = "application/json"
}

$url = "https://recaptchaenterprise.googleapis.com/v1/projects/$PROJECT_ID/assessments?key=$API_KEY"

try {
    $response = Invoke-RestMethod -Uri $url -Method POST -Body $requestBody -Headers $headers
    Write-Host "✅ Success!" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 5
} catch {
    Write-Host "❌ Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}
EOF
