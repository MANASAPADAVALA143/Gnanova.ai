# Deployment Guide for Hostinger

This guide will help you deploy your Gnanova.pro application to Hostinger hosting.

## Prerequisites

- Your Supabase credentials configured in `.env` file
- Hostinger hosting account with FTP/cPanel access
- Node.js installed locally (for building)

## Step-by-Step Deployment

### 1. Build the Production Version

In your terminal (in Cursor), run:

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 2. Prepare Environment Variables for Production

**Important:** Your `.env` file contains sensitive credentials. For production:

- **Option A (Recommended):** Set environment variables in Hostinger's hosting panel
  - Go to your Hostinger control panel
  - Find "Environment Variables" or "App Settings"
  - Add:
    - `VITE_SUPABASE_URL` = your Supabase project URL
    - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key

- **Option B:** If Hostinger doesn't support environment variables, you'll need to create a production config file (contact support for best practices)

### 3. Upload Files to Hostinger

Upload the contents of the `dist/` folder to your Hostinger hosting:

**Via FTP:**
1. Connect to your Hostinger FTP server
2. Navigate to your website's root directory (usually `public_html` or `www`)
3. Upload all files from the `dist/` folder
4. Ensure `index.html` is in the root directory

**Via cPanel File Manager:**
1. Log into Hostinger cPanel
2. Open File Manager
3. Navigate to `public_html` (or your domain's root folder)
4. Upload all files from the `dist/` folder
5. Extract if uploaded as zip

**Via Hostinger's Deployment Tool:**
1. Check if Hostinger offers Git-based deployment
2. Connect your repository
3. Set build command: `npm run build`
4. Set output directory: `dist`

### 4. Configure Server

**Important:** For React Router to work properly, you need to configure your server to redirect all routes to `index.html`.

**If using Hostinger's .htaccess (Apache):**
Create or update `.htaccess` in your root directory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**If using Nginx:**
Add this to your Nginx configuration:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 5. Verify Deployment

1. Visit your domain
2. Check browser console for any errors
3. Test authentication (login/register)
4. Verify Supabase connection is working

## Updating Your Site

When you make changes in Cursor:

1. **Develop locally** - Test at `http://localhost:5173`
2. **Build** - Run `npm run build`
3. **Upload** - Upload new `dist/` folder contents to Hostinger
4. **Clear cache** - Clear browser cache or do a hard refresh (Ctrl+F5)

## Troubleshooting

### Routes not working (404 errors)
- Ensure `.htaccess` or Nginx config is set up correctly
- Verify `index.html` is in the root directory

### Environment variables not working
- Check that variables are set in Hostinger's panel
- Verify variable names start with `VITE_`
- Restart your hosting service if needed

### Build errors
- Run `npm install` to ensure dependencies are up to date
- Check for TypeScript errors: `npm run typecheck`
- Check for linting errors: `npm run lint`

### Supabase connection issues
- Verify your Supabase URL and key are correct
- Check Supabase project is active
- Ensure CORS is configured in Supabase dashboard

## Quick Deployment Script

You can create a simple deployment script. Add this to `package.json`:

```json
"deploy:prepare": "npm run build && echo 'Build complete! Upload dist/ folder to Hostinger'"
```

Then run: `npm run deploy:prepare`

## Support

If you encounter issues:
1. Check Hostinger's documentation
2. Contact Hostinger support
3. Review browser console for errors
4. Check Supabase dashboard for connection issues
