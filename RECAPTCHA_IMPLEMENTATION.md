# reCAPTCHA Enterprise Integration

This project has been integrated with Google reCAPTCHA Enterprise to protect forms and prevent spam/bot submissions using the official Enterprise API.

## 🔧 Setup

### 1. Environment Variables

Add your reCAPTCHA Enterprise API key to your `.env.local` file:

```bash
# Required: Your Google Cloud API key
RECAPTCHA_API_KEY=your_api_key_here

# Optional: Your project ID (defaults to crack-muse-466920-q8)
RECAPTCHA_PROJECT_ID=crack-muse-466920-q8
```

### 2. Get reCAPTCHA Enterprise Keys

1. Go to [Google Cloud Console](https://console.cloud.google.com/security/recaptcha)
2. Create a new reCAPTCHA Enterprise key or use existing one
3. Configure for your domain
4. Copy the **Site Key** (already configured: `6LewOY4rAAAAAHFM3cVheqX82ITHy0JPNhTj11_B`)
5. Get your **API Key** from Google Cloud Console and add to environment variables

### 3. API Configuration

The implementation uses the official Enterprise API endpoint:
```
POST https://recaptchaenterprise.googleapis.com/v1/projects/{PROJECT_ID}/assessments?key={API_KEY}
```

Request body format:
```json
{
  "event": {
    "token": "TOKEN_FROM_FRONTEND",
    "expectedAction": "USER_ACTION",
    "siteKey": "6LewOY4rAAAAAHFM3cVheqX82ITHy0JPNhTj11_B",
    "userIpAddress": "optional_ip_address"
  }
}
```

## 🚀 Usage

### For React Components

```tsx
import { useRecaptcha } from '@/hooks/use-recaptcha';

const MyForm = () => {
  const { executeRecaptcha } = useRecaptcha();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Execute reCAPTCHA
    const token = await executeRecaptcha('SUBMIT_FORM');
    
    if (!token) {
      alert('Error de verificación. Intenta de nuevo.');
      return;
    }
    
    // Submit form with token
    await submitForm({ ...formData, recaptchaToken: token });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button type="submit">Submit</button>
    </form>
  );
};
```

### For Vanilla JavaScript

```html
<script>
  function onClick(e) {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6LewOY4rAAAAAHFM3cVheqX82ITHy0JPNhTj11_B', {action: 'LOGIN'});
      // Use the token
      console.log('reCAPTCHA token:', token);
    });
  }
</script>
```

### Server-side Verification

```typescript
import { verifyRecaptchaToken } from '@/lib/recaptcha-verification';

export async function POST(request: Request) {
  const { recaptchaToken, ...formData } = await request.json();
  
  // Verify reCAPTCHA
  const recaptchaResult = await verifyRecaptchaToken(
    recaptchaToken,
    'EXPECTED_ACTION', // Optional
    0.5 // Minimum score (0.0 to 1.0)
  );

  if (!recaptchaResult.success) {
    return Response.json(
      { error: 'Security verification failed' },
      { status: 400 }
    );
  }

  // Process the form...
}
```

## 🎯 Available Actions

- `LOGIN` - For login forms
- `REGISTER` - For registration forms  
- `PRAYER_REQUEST` - For prayer request forms
- `CONTACT_FORM` - For contact forms
- `EMAIL_SEND` - For email sending
- `SUBMIT_FORM` - Generic form submission

## 📁 Implementation Status

### ✅ Implemented
- [x] Prayer request form (`/oracion`)
- [x] Email API endpoint (`/api/send-email`)
- [x] Login form component (`/components/auth/LoginForm.tsx`)
- [x] Registration form component (`/components/auth/RegisterForm.tsx`)
- [x] Global reCAPTCHA script loading
- [x] TypeScript utilities and hooks
- [x] Server-side verification

### 🔄 Ready to Implement
- [ ] Contact forms (can use existing utilities)
- [ ] Any additional forms in the app
- [ ] Custom form implementations

## 🛠 Files Modified/Created

### Core Implementation
- `app/layout.tsx` - Added reCAPTCHA script
- `hooks/use-recaptcha.tsx` - React hook for reCAPTCHA
- `lib/recaptcha-verification.ts` - Server-side verification
- `lib/recaptcha-utils.ts` - Utility functions

### Form Updates
- `components/ui/peticiondeoracion.tsx` - Prayer form with reCAPTCHA
- `lib/prayer-requests.ts` - Updated to verify reCAPTCHA tokens
- `app/api/send-email/route.ts` - Email API with reCAPTCHA

### Example Forms
- `components/auth/LoginForm.tsx` - Login form example
- `components/auth/RegisterForm.tsx` - Registration form example

## 🔒 Security Features

1. **Client-side Protection**: Invisible reCAPTCHA that doesn't interrupt user experience
2. **Server-side Verification**: All tokens are verified on the server
3. **Score-based Filtering**: Configurable minimum score thresholds
4. **Action Verification**: Ensures tokens match expected actions
5. **Error Handling**: Graceful fallbacks for verification failures

## 🚨 Important Notes

1. **Environment Setup**: Make sure to add `RECAPTCHA_SECRET_KEY` to your environment variables
2. **Domain Configuration**: Configure your domain in Google Cloud Console
3. **Score Tuning**: Adjust minimum scores based on your needs (0.5 is recommended)
4. **User Experience**: reCAPTCHA Enterprise is invisible and doesn't require user interaction
5. **Fallback**: Forms will still work if reCAPTCHA fails to load (with warnings in console)

## 🧪 Testing

### Using the Test Scripts

1. **Node.js Test Script**: `test-recaptcha-enterprise.js`
   ```bash
   # Set your API key
   export RECAPTCHA_API_KEY=your_api_key_here
   
   # Run the test
   node test-recaptcha-enterprise.js
   ```

2. **Manual API Testing**: `test-recaptcha-api.sh`
   ```bash
   # Edit the script with your credentials
   chmod +x test-recaptcha-api.sh
   ./test-recaptcha-api.sh
   ```

3. **PowerShell Testing** (Windows):
   Use the PowerShell script included in `test-recaptcha-api.sh`

### Getting Test Tokens

To get a real token for testing:
1. Open your website in a browser
2. Open browser console
3. Run:
   ```javascript
   grecaptcha.enterprise.execute('6LewOY4rAAAAAHFM3cVheqX82ITHy0JPNhTj11_B', {action: 'SUBMIT_FORM'})
   ```
4. Copy the returned token for API testing

### Test the Implementation

1. **Prayer Form**: Visit `/oracion` to test the prayer request form
2. **Test Forms**: Visit `/recaptcha-test` to test login/register forms
3. **API Testing**: Use the provided test scripts with real tokens
4. **Console Logs**: Check browser and server console for verification details

## 📊 Response Analysis

The Enterprise API returns detailed information:

```json
{
  "tokenProperties": {
    "valid": true,
    "hostname": "your-domain.com",
    "action": "SUBMIT_FORM",
    "createTime": "2025-01-01T12:00:00Z"
  },
  "riskAnalysis": {
    "score": 0.9,
    "reasons": []
  }
}
```

### Score Interpretation:
- **0.9-1.0**: 🟢 Very likely human
- **0.7-0.8**: 🟡 Likely human  
- **0.5-0.6**: 🟠 Suspicious
- **0.0-0.4**: 🔴 Likely bot

## 📊 Monitoring

Monitor reCAPTCHA effectiveness in:
- Google Cloud Console reCAPTCHA dashboard
- Server logs for verification success/failure rates
- User feedback for any friction issues
