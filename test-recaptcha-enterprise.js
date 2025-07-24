/**
 * reCAPTCHA Enterprise API Testing Script (Node.js)
 * 
 * This script demonstrates how to verify reCAPTCHA tokens using the Enterprise API
 * Run with: node test-recaptcha-enterprise.js
 */

const https = require('https');

// Configuration - Replace with your actual values
const CONFIG = {
  API_KEY: process.env.RECAPTCHA_API_KEY || 'your_api_key_here',
  PROJECT_ID: process.env.RECAPTCHA_PROJECT_ID || 'crack-muse-466920-q8',
  SITE_KEY: '6LewOY4rAAAAAHFM3cVheqX82ITHy0JPNhTj11_B',
  // You'll get this token from the frontend when testing
  SAMPLE_TOKEN: 'your_token_from_frontend_here'
};

/**
 * Test the reCAPTCHA Enterprise API
 */
async function testRecaptchaEnterprise(token, expectedAction = 'SUBMIT_FORM', userIpAddress = '192.168.1.1') {
  console.log('🔍 Testing reCAPTCHA Enterprise API...');
  console.log('📋 Configuration:', {
    projectId: CONFIG.PROJECT_ID,
    siteKey: CONFIG.SITE_KEY,
    expectedAction,
    hasApiKey: !!CONFIG.API_KEY && CONFIG.API_KEY !== 'your_api_key_here',
    hasToken: !!token && token !== 'your_token_from_frontend_here'
  });

  if (!CONFIG.API_KEY || CONFIG.API_KEY === 'your_api_key_here') {
    console.error('❌ Please set your RECAPTCHA_API_KEY in environment variables or update CONFIG.API_KEY');
    return;
  }

  if (!token || token === 'your_token_from_frontend_here') {
    console.error('❌ Please provide a valid token from your frontend');
    console.log('💡 To get a token, open your browser console on a page with reCAPTCHA and run:');
    console.log('   grecaptcha.enterprise.execute("6LewOY4rAAAAAHFM3cVheqX82ITHy0JPNhTj11_B", {action: "SUBMIT_FORM"})');
    return;
  }

  // Create request body
  const requestBody = {
    event: {
      token: token,
      expectedAction: expectedAction,
      siteKey: CONFIG.SITE_KEY,
      userIpAddress: userIpAddress
    }
  };

  console.log('📝 Request body:', JSON.stringify(requestBody, null, 2));

  try {
    const result = await makeApiRequest(requestBody);
    console.log('✅ API Response:', JSON.stringify(result, null, 2));
    
    // Analyze the response
    analyzeResponse(result);
    
  } catch (error) {
    console.error('❌ API Error:', error.message);
    if (error.details) {
      console.error('📋 Details:', error.details);
    }
  }
}

/**
 * Make the API request to reCAPTCHA Enterprise
 */
function makeApiRequest(requestBody) {
  return new Promise((resolve, reject) => {
    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${CONFIG.PROJECT_ID}/assessments?key=${CONFIG.API_KEY}`;
    const data = JSON.stringify(requestBody);
    
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`), { details: parsed });
          }
        } catch (parseError) {
          reject(new Error('Failed to parse response'), { details: responseData });
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.write(data);
    req.end();
  });
}

/**
 * Analyze and explain the API response
 */
function analyzeResponse(response) {
  console.log('\n📊 Response Analysis:');
  console.log('='.repeat(50));
  
  if (response.tokenProperties) {
    const { valid, invalidReason, hostname, action, createTime } = response.tokenProperties;
    console.log(`🔐 Token Valid: ${valid ? '✅ Yes' : '❌ No'}`);
    if (!valid && invalidReason) {
      console.log(`❌ Invalid Reason: ${invalidReason}`);
    }
    console.log(`🌐 Hostname: ${hostname}`);
    console.log(`🎯 Action: ${action}`);
    console.log(`⏰ Created: ${createTime}`);
  }
  
  if (response.riskAnalysis) {
    const { score, reasons } = response.riskAnalysis;
    console.log(`\n📈 Risk Score: ${score} (0.0 = bot, 1.0 = human)`);
    
    let interpretation = '';
    if (score >= 0.8) interpretation = '🟢 Very likely human';
    else if (score >= 0.6) interpretation = '🟡 Likely human';
    else if (score >= 0.4) interpretation = '🟠 Suspicious';
    else interpretation = '🔴 Likely bot';
    
    console.log(`📋 Interpretation: ${interpretation}`);
    
    if (reasons && reasons.length > 0) {
      console.log(`⚠️  Risk Reasons: ${reasons.join(', ')}`);
    }
  }
  
  console.log('='.repeat(50));
  
  // Recommendations
  if (response.riskAnalysis?.score < 0.5) {
    console.log('💡 Recommendation: Consider blocking or requiring additional verification');
  } else if (response.riskAnalysis?.score >= 0.7) {
    console.log('💡 Recommendation: Safe to proceed');
  } else {
    console.log('💡 Recommendation: Monitor closely or apply additional checks');
  }
}

// Example usage
if (require.main === module) {
  // Test with sample data
  console.log('🚀 Starting reCAPTCHA Enterprise API Test');
  console.log('💡 Make sure to set your environment variables or update the CONFIG object');
  console.log('');
  
  testRecaptchaEnterprise(
    CONFIG.SAMPLE_TOKEN,
    'SUBMIT_FORM'
  );
}

module.exports = { testRecaptchaEnterprise, CONFIG };
