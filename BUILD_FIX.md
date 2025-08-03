# Build Fix: Resend API Key Issue

## Problem
The build was failing because the Resend client was being initialized at module load time without an API key, causing build-time errors.

## Solution
1. **Lazy Initialization**: Changed the Resend client to initialize only when needed
2. **Proper Error Handling**: Added checks for missing API key with clear error messages
3. **Build-time Placeholder**: Added a placeholder API key for development/build purposes

## Code Changes

### Before (Problematic)
```typescript
// This would fail at build time if no API key
const resend = new Resend(process.env.RESEND_API_KEY);
```

### After (Fixed)
```typescript
// Lazy initialization - only creates client when actually sending email
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}
```

## Setting Up Resend for Production

### 1. Get Your Resend API Key
1. Go to [resend.com](https://resend.com)
2. Create an account or log in
3. Navigate to API Keys in the dashboard
4. Create a new API key for your project

### 2. Update Environment Variables
Replace the placeholder in `.env.local`:

```bash
# Replace this placeholder:
RESEND_API_KEY="re_placeholder_for_build"

# With your actual API key:
RESEND_API_KEY="re_your_actual_api_key_here"
```

### 3. Configure Your Domain (Optional but Recommended)
1. In Resend dashboard, go to Domains
2. Add your domain (e.g., `rotem-architecture.com`)
3. Configure DNS records as shown
4. Verify domain ownership

### 4. Update From Email (Optional)
```bash
# Add this to your .env.local if you want custom from address:
RESEND_FROM_EMAIL="רותם אדריכלות <hello@rotem-architecture.com>"
```

## Testing Email Functionality

### Development Testing
```bash
# 1. Add your real Resend API key to .env.local
# 2. Start the development server
npm run dev

# 3. Test the contact form at http://localhost:3000/contact
# 4. Test quote requests at http://localhost:3000/quote
```

### Build Testing
```bash
# This should now work without errors:
npm run build

# And you can start the production build:
npm start
```

## Environment Variables Summary

Required for email functionality:
```bash
RESEND_API_KEY="re_your_api_key_here"
RESEND_ADMIN_EMAIL="admin@rotem-architecture.com"
```

Optional (with fallbacks):
```bash
RESEND_FROM_EMAIL="Your Name <noreply@yourdomain.com>"
ADMIN_EMAIL="fallback@yourdomain.com"  # Fallback for RESEND_ADMIN_EMAIL
```

## What Happens Without API Key

- **Build Time**: ✅ Build succeeds (lazy initialization)
- **Runtime**: ❌ Email sending fails with clear error message
- **User Experience**: Form submission returns error, but no crashes

## Next Steps

1. **Get Resend API Key**: Sign up at resend.com and get your API key
2. **Update .env.local**: Replace the placeholder with your real API key
3. **Test Email Flow**: Try the contact form and quote request
4. **Production Setup**: Configure domain and update environment variables for production deployment

The build issue is now resolved! 🎉
