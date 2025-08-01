# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Next.js TypeScript website for an architect and interior design studio with the following specifications:

- **Hebrew RTL (Right-to-Left) Support**: All content should be in Hebrew and properly formatted for RTL layout
- **Mobile-First Design**: Responsive design prioritizing mobile experience
- **ShadCN UI + Tailwind CSS**: Use these for styling components
- **React Query**: For all API requests and state management
- **Zod**: For schema validation on forms and API responses
- **Stripe Integration**: For payment processing
- **AWS Backend**: Lambda functions for serverless backend operations

## Key Features
1. Static marketing pages (home, services, about, contact)
2. Service selection with shopping cart functionality
3. Quote request form with file upload capabilities
4. Stripe checkout integration
5. Email notifications via AWS SES
6. reCAPTCHA protection
7. Responsive Hebrew RTL design

## Development Guidelines
- Always implement Hebrew text content
- Use RTL-appropriate layout classes (mr-, ml- should be switched to ms-, me-)
- Implement proper form validation with Zod schemas
- Use React Query for all API calls
- Follow mobile-first responsive design patterns
- Maintain consistent styling with ShadCN UI components
- Ensure accessibility standards are met
