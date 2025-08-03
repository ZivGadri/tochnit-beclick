# Email Service Migration: AWS SES → Resend

## Overview
This project has been migrated from AWS SES to Resend for improved developer experience, better email deliverability, and simpler setup.

## What Changed

### Dependencies
- **Removed**: `@aws-sdk/client-ses`, `nodemailer`
- **Added**: `resend`, `@react-email/components`, `@react-email/render`

### Email Templates
- **Before**: Plain HTML templates in `src/lib/email.ts`
- **After**: React Email components in `src/components/emails/`
  - `quote-request-admin.tsx` - Admin notification for quote requests
  - `contact-form-admin.tsx` - Admin notification for contact forms
  - `quote-response-email.tsx` - Quote response to customers
  - `thank-you-email.tsx` - Thank you emails for customers

### Configuration
- **Before**: Multiple AWS environment variables
- **After**: Simple Resend configuration
  ```env
  RESEND_API_KEY=re_your_api_key_here
  RESEND_ADMIN_EMAIL=admin@rotem-architecture.co.il
  ```

### API Routes Updated
- `src/app/api/email/quote-request/route.ts`
- `src/app/api/email/contact/route.ts`
- `src/app/api/email/quote-response/route.ts`

## Benefits of Resend

1. **Simpler Setup**: Single API key vs multiple AWS credentials
2. **Better Templates**: React Email components with JSX syntax
3. **Improved Deliverability**: Better reputation and IP management
4. **Developer Experience**: Better debugging and analytics
5. **Cost Effective**: More predictable pricing model

## Email Features

### Professional Templates
- RTL Hebrew support for Israeli audience
- Responsive design for mobile devices
- Professional branding and styling
- Clear call-to-actions

### Automated Workflows
- Admin notifications for all form submissions
- Customer thank you emails with next steps
- Quote response emails with detailed pricing

### Template Types
1. **Quote Request**: Detailed project information to admin + thank you to customer
2. **Contact Form**: Simple contact message to admin + thank you to customer
3. **Quote Response**: Professional quote delivery from admin to customer

## Setup Instructions

1. **Get Resend API Key**
   ```bash
   # Visit https://resend.com and create an account
   # Generate an API key in the dashboard
   ```

2. **Update Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Resend API key
   ```

3. **Verify Domain** (Production only)
   ```bash
   # Add your domain in Resend dashboard
   # Configure DNS records for better deliverability
   ```

## Migration Checklist

- [x] Remove AWS SES dependencies
- [x] Install Resend and React Email packages
- [x] Create Resend service (`src/lib/resend.ts`)
- [x] Convert email templates to React Email components
- [x] Update API routes to use Resend
- [x] Remove old email service file
- [x] Update environment configuration
- [x] Test email functionality
- [ ] Configure production domain in Resend
- [ ] Update deployment environment variables

## Testing Emails

### Development
```bash
# All emails will be sent to your configured admin email
# Customer emails will be sent to the actual customer addresses
npm run dev
```

### Production
```bash
# Configure your domain in Resend dashboard first
# Update RESEND_ADMIN_EMAIL to your production email
npm run build && npm start
```

## Troubleshooting

### Common Issues
1. **"Missing API key" error**: Check RESEND_API_KEY in environment
2. **Email not delivered**: Verify domain configuration in Resend
3. **Template errors**: Check React Email component syntax

### Environment Variables
```env
# Required
RESEND_API_KEY=re_your_key_here
RESEND_ADMIN_EMAIL=admin@yourdomain.com

# Optional (falls back to ADMIN_EMAIL)
ADMIN_EMAIL=fallback@yourdomain.com
```

## Next Steps

1. **Domain Configuration**: Set up your production domain in Resend
2. **Analytics**: Monitor email performance in Resend dashboard
3. **Additional Templates**: Create more email templates as needed
4. **Webhooks**: Set up delivery and bounce webhooks for better tracking
