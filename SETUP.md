# Environment Variables Setup Guide

## Required Environment Variables for Full Functionality

Copy these to your `.env.local` file:

### Stripe Configuration (for payment processing)
```bash
# Stripe Test Keys (Get from https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...your_test_publishable_key
STRIPE_SECRET_KEY=sk_test_...your_test_secret_key

# Base URL for your application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### reCAPTCHA v3 Configuration (for form security)
```bash
# Get keys from https://www.google.com/recaptcha/admin
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_v3_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_v3_secret_key
```

### Email Service Configuration (Resend)
```bash
# Get API key from https://resend.com/api-keys
RESEND_API_KEY=re_...your_resend_api_key
RESEND_ADMIN_EMAIL=admin@yourdomain.com
```

### Database (if using)
```bash
DATABASE_URL="your_database_connection_string"
```

## Setup Instructions

### 1. Stripe Setup
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create account or login
3. Get your test API keys from API Keys section
4. Add both publishable and secret keys to `.env.local`

### 2. reCAPTCHA v3 Setup
1. Go to [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site with reCAPTCHA v3
3. Add your domain (localhost for development)
4. Copy site key and secret key to `.env.local`

### 3. Resend Email Setup
1. Go to [Resend](https://resend.com/)
2. Create account and verify your domain
3. Get API key from dashboard
4. Add API key and admin email to `.env.local`

## Testing

After setting up environment variables:

1. Start development server: `npm run dev`
2. Test adding services to cart
3. Test checkout flow with Stripe test cards
4. Test form submissions with reCAPTCHA

### Stripe Test Cards
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- Requires Authentication: `4000 0025 0000 3155`

## Production Deployment

Before deploying to production:

1. Replace all test keys with live keys
2. Update `NEXT_PUBLIC_BASE_URL` to your production domain
3. Add production domain to reCAPTCHA settings
4. Verify Resend domain is configured correctly
