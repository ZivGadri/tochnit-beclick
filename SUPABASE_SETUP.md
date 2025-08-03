# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `rotem-architecture`
   - **Database Password**: Choose a strong password
   - **Region**: Choose the closest region to your users

## 2. Get Your Project Credentials

After your project is created, go to **Settings** > **API** and copy:

- **Project URL** (looks like: `https://[your-project-ref].supabase.co`)
- **Project API Keys**:
  - `anon` `public` key
  - `service_role` `secret` key

## 3. Update Environment Variables

Update your `.env.local` file with the actual values:

```env
# Supabase Database - Replace with your actual values from step 2
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase Configuration - Replace with your actual values
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here-replace-with-random-string"

# Admin Credentials (for initial setup)
ADMIN_EMAIL="admin@rotem-architecture.com"
ADMIN_PASSWORD="change-this-password"
```

### How to get the values:

1. **YOUR-PROJECT-REF**: Found in your Supabase project URL
2. **YOUR-PASSWORD**: The database password you set when creating the project
3. **YOUR-ANON-KEY**: Copy from Settings > API > Project API keys > anon public
4. **YOUR-SERVICE-ROLE-KEY**: Copy from Settings > API > Project API keys > service_role secret

## 4. Run Database Setup

Once your environment variables are configured:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to Supabase (creates tables)
npm run db:push

# Create admin user
npm run db:seed
```

## 5. Optional: Enable Row Level Security (RLS)

For production, you should enable RLS on your tables in Supabase:

1. Go to **Table Editor** in your Supabase dashboard
2. For each table, click the settings icon and enable "Row Level Security"
3. Add appropriate policies for your use case

## 6. Test Your Setup

```bash
# Start the development server
npm run dev

# Navigate to http://localhost:3000/admin/login
# Login with: admin@rotem-architecture.com / change-this-password
```

## Supabase vs Local Database Benefits

✅ **Managed**: No need to install PostgreSQL locally  
✅ **Scalable**: Automatic scaling and backups  
✅ **Real-time**: Built-in real-time subscriptions  
✅ **Storage**: Built-in file storage for portfolio images  
✅ **Auth**: Optional Supabase Auth (we're using NextAuth)  
✅ **Edge**: Global edge network for performance  

## Available Scripts

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to Supabase without migration files
- `npm run db:migrate` - Create migration files and apply them
- `npm run db:studio` - Open Prisma Studio to view your data
- `npm run db:seed` - Create the initial admin user

## Troubleshooting

- **Connection Issues**: Make sure your DATABASE_URL includes the correct password and project reference
- **SSL Errors**: Supabase requires SSL connections, which is handled automatically
- **Permission Errors**: Make sure you're using the service role key for admin operations
