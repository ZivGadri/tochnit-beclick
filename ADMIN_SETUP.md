# Admin Dashboard Setup - Phase 3

## Overview
The admin dashboard provides comprehensive management capabilities for:
- Quote requests management
- Order processing
- Portfolio management
- Contact form submissions
- User management
- Analytics and reporting

## Database Setup

1. **Configure Database URL**
   ```bash
   # Update .env.local with your PostgreSQL connection string
   DATABASE_URL="postgresql://username:password@localhost:5432/rotem_architecture?schema=public"
   ```

2. **Run Database Migration**
   ```bash
   npm run db:migrate
   ```

3. **Create Admin User**
   ```bash
   npm run db:seed
   ```

## Environment Variables

Required environment variables in `.env.local`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/rotem_architecture?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here-replace-with-random-string"

# Admin Credentials
ADMIN_EMAIL="admin@rotem-architecture.com"
ADMIN_PASSWORD="change-this-password"
```

## Features Implemented

### 1. Authentication System
- NextAuth.js with credentials provider
- Admin role-based access control
- Session management
- Protected routes middleware

### 2. Database Schema
- **Users**: Admin and client accounts
- **Quotes**: Quote request management
- **Orders**: Order processing and tracking
- **Portfolio**: Portfolio item management
- **Contacts**: Contact form submissions
- **Settings**: Admin configuration

### 3. Admin Dashboard
- Real-time statistics
- Quick action cards
- Responsive design
- Hebrew RTL support

## Access the Admin Panel

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/admin/login`

3. Login with:
   - Email: `admin@rotem-architecture.com`
   - Password: `admin123` (change after first login)

## Available Scripts

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database without migration
- `npm run db:migrate` - Create and run migration
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Create admin user

## Next Steps

1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Create admin user
5. Access admin dashboard

## Security Notes

- Change default admin password immediately
- Use strong NEXTAUTH_SECRET in production
- Add .env files to .gitignore
- Use HTTPS in production
