# Gnanova.pro

AI-Powered Marketing Automation Platform

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your app.

### Build for Production

```bash
# Create production build
npm run build
```

The `dist/` folder contains your production-ready files.

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Hostinger.

**Quick deployment steps:**
1. Run `npm run build`
2. Upload `dist/` folder contents to Hostinger
3. Configure server for React Router (see DEPLOYMENT.md)

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Supabase** - Backend & Authentication

## 📝 Environment Variables

Create a `.env` file in the root directory:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## 🔧 Development Workflow

1. Make changes in Cursor
2. Test locally at `http://localhost:5173`
3. Build with `npm run build`
4. Deploy `dist/` folder to Hostinger

## 📄 License

Private - All rights reserved
