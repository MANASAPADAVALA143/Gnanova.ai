# Deploy to Vercel - Quick Guide

Vercel is perfect for React/Vite apps! It's free, fast, and easy to deploy.

## 🚀 Quick Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Log in with GitHub

2. **Import Your Project:**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose your GitHub repo: `MANASAPADAVALA143/Gnanova.ai`
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Vite (should auto-detect)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `dist` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
   - Click "Add" for each

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live! 🎉

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Add Environment Variables:**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

---

## 📝 Create vercel.json (Optional but Recommended)

Create a `vercel.json` file in your project root for better configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures React Router works correctly on Vercel.

---

## 🔄 Updating Your Site

After making changes in Cursor:

1. **Commit and Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

2. **Vercel Auto-Deploys:**
   - Vercel automatically detects the push
   - Builds and deploys your changes
   - Usually takes 2-3 minutes
   - You'll get a notification when done

---

## 🌐 Your Website URL

After deployment, you'll get:
- **Automatic URL:** `your-project-name.vercel.app`
- **Custom Domain:** You can add your own domain later

---

## 🔗 Later: Connect to Hostinger

When you're ready to use Hostinger:

### Option A: Point Domain to Vercel
1. Keep your site on Vercel (it's free and fast!)
2. In Hostinger, point your domain to Vercel
3. In Vercel dashboard, add your custom domain
4. Update DNS records in Hostinger

### Option B: Migrate to Hostinger
1. Build your site: `npm run build`
2. Upload `dist/` folder to Hostinger
3. Follow the Hostinger deployment guide

**Recommendation:** Vercel is excellent for React apps - consider keeping it there and just pointing your domain from Hostinger to Vercel!

---

## ✅ Benefits of Vercel

- ✅ **Free** for personal projects
- ✅ **Automatic deployments** from GitHub
- ✅ **Fast CDN** worldwide
- ✅ **Easy environment variables**
- ✅ **Automatic HTTPS**
- ✅ **Preview deployments** for every push
- ✅ **Perfect for React/Vite apps**

---

## 🐛 Troubleshooting

### Build Fails
- Check environment variables are set
- Verify `npm run build` works locally
- Check Vercel build logs

### Routes Not Working (404)
- Add `vercel.json` with rewrites (see above)
- Or ensure React Router is configured correctly

### Environment Variables Not Working
- Make sure they start with `VITE_`
- Redeploy after adding variables
- Check variable names match exactly

---

## 📞 Need Help?

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support:** Available in dashboard
- **Community:** Vercel Discord

---

**You're all set!** Deploy to Vercel and share the URL with Hostinger when ready! 🚀
