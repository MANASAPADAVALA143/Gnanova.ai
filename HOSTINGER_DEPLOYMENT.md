# How to Deploy to Hostinger - Step by Step

## 🎯 For New Website Deployment (Not Migration)

Since you're deploying a **new website** (not migrating an existing one), follow these steps:

---

## Step 1: Build Your Website Locally

In Cursor terminal, run:

```bash
npm run build
```

This creates a `dist/` folder with all your production files.

---

## Step 2: Access Hostinger hPanel

1. Go to [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Log in to your account
3. Select your domain/hosting plan

---

## Step 3: Upload Files via File Manager

### Option A: Using File Manager (Easiest)

1. **Open File Manager:**
   - In hPanel, find "Files" section
   - Click "File Manager"

2. **Navigate to Root Directory:**
   - Go to `public_html` folder (this is your website's root)
   - If you see `www` folder, use that instead

3. **Upload Your Files:**
   - Click "Upload" button
   - Select **ALL files and folders** from your `dist/` folder
   - Wait for upload to complete
   - **Important:** Upload the CONTENTS of `dist/` folder, not the `dist/` folder itself

4. **Verify Structure:**
   - You should see `index.html` in `public_html` root
   - You should see `assets/` folder with your CSS/JS files

---

### Option B: Using FTP (Alternative)

1. **Get FTP Credentials:**
   - In hPanel, go to "FTP Accounts"
   - Note your FTP host, username, and password

2. **Connect via FTP Client:**
   - Use FileZilla, WinSCP, or any FTP client
   - Connect to your Hostinger FTP server
   - Navigate to `public_html` folder

3. **Upload Files:**
   - Upload all contents from `dist/` folder
   - Ensure `index.html` is in the root

---

## Step 4: Add .htaccess File for React Router

1. **In File Manager:**
   - Go to `public_html` root directory
   - Click "New File"
   - Name it: `.htaccess` (with the dot at the beginning)

2. **Add This Content:**
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

3. **Save the file**

**OR** copy the `.htaccess.template` file from your project to `dist/` folder before uploading, then rename it to `.htaccess`.

---

## Step 5: Configure Environment Variables

Since Vite needs environment variables at build time, you have two options:

### Option A: Build with Production Variables (Recommended)

1. **Create a production `.env` file locally:**
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-actual-anon-key
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

3. **Upload the new `dist/` folder**

### Option B: Use Hostinger Environment Variables (If Supported)

1. In hPanel, look for "Environment Variables" or "App Settings"
2. Add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase key

**Note:** Most shared hosting doesn't support runtime environment variables for Vite apps, so Option A is usually better.

---

## Step 6: Test Your Website

1. **Visit your domain:**
   - Go to `https://yourdomain.com`
   - The landing page should load

2. **Test Routes:**
   - Try navigating to `/login` or `/register`
   - Should work without 404 errors (thanks to `.htaccess`)

3. **Check Browser Console:**
   - Press F12 → Console tab
   - Look for any errors
   - Verify Supabase connection works

---

## Step 7: Update DNS (If Needed)

If you just purchased the domain:

1. In hPanel, go to "Domains"
2. Point your domain to your hosting
3. Wait for DNS propagation (can take up to 24 hours)

---

## 🔄 Updating Your Website Later

When you make changes in Cursor:

1. **Make your changes** in Cursor
2. **Test locally:** `npm run dev`
3. **Build:** `npm run build`
4. **Upload new `dist/` folder** to Hostinger (replace old files)
5. **Clear browser cache** (Ctrl+F5) to see changes

---

## ⚠️ Important Notes

### File Structure Should Be:
```
public_html/
├── index.html
├── .htaccess
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── (other static files)
```

### Common Issues:

1. **404 Errors on Routes:**
   - Make sure `.htaccess` file exists and has correct content
   - Verify it's in the root directory

2. **Blank Page:**
   - Check browser console for errors
   - Verify all files uploaded correctly
   - Check that `index.html` is in root

3. **Supabase Not Working:**
   - Verify environment variables are in the build
   - Check Supabase dashboard for CORS settings
   - Ensure Supabase project is active

4. **Files Not Uploading:**
   - Check file permissions in File Manager
   - Try uploading via FTP instead
   - Contact Hostinger support

---

## 📞 Need Help?

- **Hostinger Support:** Available 24/7 in hPanel
- **Documentation:** Check Hostinger's knowledge base
- **File Manager Issues:** Try FTP as alternative

---

## ✅ Quick Checklist

- [ ] Built project with `npm run build`
- [ ] Uploaded all files from `dist/` to `public_html`
- [ ] Added `.htaccess` file for React Router
- [ ] Configured environment variables (in build or hosting panel)
- [ ] Tested website at your domain
- [ ] Verified routes work (no 404 errors)
- [ ] Checked browser console for errors

---

**You're all set!** Your website should now be live on Hostinger. 🚀
