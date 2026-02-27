# Project Dependencies & Modules

## Overview
This is a **Next.js E-commerce & Admin Dashboard** application for **Reyes Solutions LLC** with Supabase backend integration.

---

## Production Dependencies (Required)

### Core Framework
- **next** (^16.0.8) - React framework for production
  - Server-side rendering (SSR)
  - API routes
  - File-based routing

- **react** (^19.1.0) - UI library
  - Core React functionality

- **react-dom** (^19.1.0) - React DOM rendering
  - Rendering React components to DOM

### Backend & Database
- **@supabase/supabase-js** (^2.57.4) - Supabase client library
  - Database queries (PostgreSQL)
  - Authentication
  - Real-time updates

- **@supabase/ssr** (^0.7.0) - Supabase Server-Side Rendering utilities
  - Session management
  - Server-side authentication

### UI Components & Icons
- **lucide-react** (^0.539.0) - Icon library
  - 500+ SVG icons
  - Lightweight and tree-shakeable
  - Used throughout the app (ShoppingCart, Edit2, Trash2, etc.)

### Notifications & Toast
- **react-hot-toast** (^2.6.0) - Toast notification library
  - Non-blocking notifications
  - Success, error, and info messages
  - Auto-dismiss functionality

### Styling & CSS
- **autoprefixer** (^10.4.21) - PostCSS plugin
  - Adds vendor prefixes to CSS

- **postcss** (^8.5.6) - CSS transformation tool
  - Used with Tailwind CSS
  - Processes CSS files

### Styling Framework (via devDependencies)
- **tailwindcss** (^4.1.17) - Utility-first CSS framework
  - Responsive design
  - Custom color themes
  - Component styling

- **@tailwindcss/postcss** (^4.1.17) - PostCSS plugin for Tailwind
  - Processes Tailwind directives

---

## Development Dependencies (Not needed in production)

- **tailwindcss** (^4.1.17) - For development styling
- **@tailwindcss/postcss** (^4.1.17) - For development PostCSS

---

## Environment Variables (.env file)

```env
# Supabase Configuration (Get from your Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Application Settings
NEXT_PUBLIC_APP_NAME=Reyes Solutions LLC
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin Settings
ADMIN_PIN=1234
```

### How to Get Supabase Keys:
1. Create account at https://supabase.com
2. Create a new project
3. Go to Settings → API
4. Copy the URL and Keys

---

## Project Structure & Key Features

### Pages & Routes
- **Home** (`/`) - Landing page with featured products
- **Products** (`/products`) - All products listing with search
- **Product Detail** (`/product/[id]`) - Individual product page
- **Cart** (`/cart`) - Shopping cart with checkout
- **Checkout** (`/checkout`) - Order placement
- **Success** (`/success/[id]`) - Order confirmation
- **Vendors** (`/vendors`) - Vendor listings
- **Admin Login** (`/admin/login`) - PIN-based authentication
- **Admin Dashboard** (`/admin/dashboard`) - Product management
- **Admin Products** (`/admin/products`) - CRUD operations
- **Add/Edit Product** (`/admin/products/add`, `/admin/products/[id]`)

### Database Tables (Supabase)
1. **products** - Product catalog
2. **orders** - Customer orders
3. **admin_users** - Admin PIN authentication

### Key Components
- `Header.js` - Navigation header with cart
- `Footer.js` - Footer with contact info
- `ProductCard.js` - Reusable product display component
- `Toast.js` - Toast notifications
- `LoadingSpinner.js` - Loading indicator
- `FeaturedProductsWrapper.js` - Featured products section
- `LayoutWrapper.js` - Main layout wrapper

---

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create & Configure .env
Copy the `.env` template and fill in your Supabase credentials.

### 3. Set Up Supabase Database
Run the SQL schema from `src/lib/supabase/schema.sql` in your Supabase SQL editor.

### 4. Run Development Server
```bash
npm run dev
```
Visit http://localhost:3000

### 5. Build for Production
```bash
npm run build
npm start
```

---

## Database Schema

### Products Table
```sql
- id (UUID, Primary Key)
- name (TEXT, Required)
- price (NUMERIC, Required)
- image (TEXT)
- description (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Orders Table
```sql
- id (UUID, Primary Key)
- full_name (TEXT, Required)
- phone (TEXT, Required)
- address (TEXT, Required)
- email (TEXT)
- products (JSONB, Required)
- total_price (NUMERIC, Required)
- status (TEXT, Default: 'pending')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Admin Users Table
```sql
- id (UUID, Primary Key)
- pin (TEXT, Unique, Required)
- name (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

---

## Important Notes

✅ **All dependencies are modern and up-to-date**
✅ **Tailwind CSS v4+ for utility-first styling**
✅ **Next.js 16+ for optimal performance**
✅ **Supabase for real-time database**
✅ **PIN-based admin authentication (SessionStorage)**
✅ **LocalStorage for cart persistence**

---

## Troubleshooting

**Missing Supabase Variables?** → Get them from Supabase dashboard
**Database not loading?** → Run schema.sql in Supabase SQL editor
**Admin login not working?** → Check if admin PIN exists in admin_users table
**Styling not working?** → Run `npm run build` or restart dev server

---

Last Updated: February 2026
Project: Reyes Solutions LLC E-commerce Platform
