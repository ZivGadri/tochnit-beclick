# 🏗️ Rotem - Architect & Interior Design Services

A modern, responsive website for an architecture and interior design studio, built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Hebrew RTL Support**: Fully optimized for Hebrew right-to-left language
- **Mobile-First Design**: Responsive design prioritizing mobile experience
- **Service Selection Cart**: Add multiple services to cart with custom options
- **Quote Request System**: Form with file upload capabilities
- **Stripe Integration**: Secure payment processing
- **Modern UI**: Built with ShadCN UI components and Tailwind CSS
- **Type-Safe**: Full TypeScript support with Zod validation
- **State Management**: React Query for API calls, Context API for cart

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, ShadCN UI components
- **State Management**: React Query, React Context
- **Validation**: Zod schema validation
- **Icons**: Lucide React
- **Payment**: Stripe integration
- **Charts**: Recharts
- **Font**: Heebo (Hebrew & Latin support)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rotem-architectual-services
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with Hebrew font
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Layout components
│   │   ├── header.tsx     # Navigation header
│   │   └── footer.tsx     # Site footer
│   ├── sections/          # Page sections
│   │   ├── hero.tsx       # Hero section
│   │   ├── services.tsx   # Services showcase
│   │   ├── about.tsx      # About section
│   │   └── contact.tsx    # Contact section
│   ├── ui/                # ShadCN UI components
│   └── providers.tsx      # React Query provider
├── hooks/
│   └── use-cart.tsx       # Shopping cart hook
└── lib/
    ├── utils.ts           # Utility functions
    └── services.ts        # Service data models
```

## 🎨 Design System

The website uses a comprehensive design system built on:
- **Colors**: Primary blue theme with semantic color tokens
- **Typography**: Heebo font family for Hebrew and Latin
- **Spacing**: Consistent spacing scale using Tailwind
- **Components**: Reusable ShadCN UI components
- **RTL Support**: Proper right-to-left layout for Hebrew content

## 🌐 Internationalization

- **Language**: Hebrew (he) as primary language
- **Direction**: Right-to-left (RTL) layout
- **Font**: Heebo font with Hebrew character support
- **Spacing**: RTL-aware spacing classes (ml/mr → ms/me)

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tailwind CSS responsive breakpoints
- **Touch Friendly**: Appropriate touch targets and spacing
- **Performance**: Optimized images and assets

## 🚀 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Environment Variables

Create a `.env.local` file with:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# AWS (for file uploads and emails)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET=your_bucket_name

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

## 🎯 Roadmap

### Phase 1: Core Features ✅
- [x] Homepage with hero, services, about, contact sections
- [x] Responsive Hebrew RTL design
- [x] Shopping cart functionality
- [x] Basic service catalog

### Phase 2: Advanced Features (Next)
- [ ] Quote request form with file uploads
- [ ] Stripe checkout integration
- [ ] Service detail pages
- [ ] Portfolio gallery
- [ ] Admin dashboard

### Phase 3: Enhanced Features (Future)
- [ ] User accounts and order history
- [ ] Email notifications (AWS SES)
- [ ] Advanced search and filtering
- [ ] Multi-language support
- [ ] Performance optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, please contact:
- Email: rotem@example.com
- Phone: 050-123-4567
