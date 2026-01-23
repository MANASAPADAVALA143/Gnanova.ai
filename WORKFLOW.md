# Development & Deployment Workflow

## 🔄 Your Workflow Options

### Option 1: Cursor → GitHub → Vercel (Recommended)

**This is the easiest and most automated!**

```
Cursor (Make Changes)
    ↓
GitHub (Push manually)
    ↓
Vercel (Auto-deploys automatically)
    ↓
Share Vercel URL with Hostinger
```

**Steps:**
1. **Make changes in Cursor** - Edit your code
2. **Test locally** - Run `npm run dev` to test
3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
4. **Vercel auto-deploys** - Vercel detects the push and automatically builds & deploys
5. **Share URL** - Give the Vercel URL to Hostinger

**Benefits:**
- ✅ Automatic deployments (no manual upload)
- ✅ Preview URLs for every change
- ✅ Fast and reliable
- ✅ Free hosting

---

### Option 2: Cursor → GitHub → Hostinger (Manual)

**If you want to host directly on Hostinger:**

```
Cursor (Make Changes)
    ↓
GitHub (Push manually)
    ↓
Build locally (npm run build)
    ↓
Upload to Hostinger (Manual upload)
```

**Steps:**
1. **Make changes in Cursor** - Edit your code
2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. **Build locally:**
   ```bash
   npm run build
   ```
4. **Upload to Hostinger:**
   - Go to Hostinger File Manager
   - Upload contents of `dist/` folder
   - Replace old files

**Note:** This requires manual upload each time.

---

### Option 3: Cursor → GitHub → Vercel → Hostinger Domain

**Best of both worlds - Use Vercel but with your Hostinger domain:**

```
Cursor (Make Changes)
    ↓
GitHub (Push manually)
    ↓
Vercel (Auto-deploys)
    ↓
Point Hostinger domain to Vercel
```

**Steps:**
1. Deploy to Vercel (as in Option 1)
2. In Vercel dashboard, add your custom domain
3. In Hostinger, update DNS to point to Vercel
4. Your site runs on Vercel but uses your Hostinger domain

**Benefits:**
- ✅ Automatic deployments
- ✅ Use your own domain
- ✅ Fast Vercel hosting
- ✅ No manual uploads needed

---

## 📝 Quick Reference Commands

### Daily Workflow (Most Common)

```bash
# 1. Make changes in Cursor
# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Description of changes"
git push

# 4. Vercel automatically deploys (if using Option 1)
# OR
# 4. Build and upload to Hostinger (if using Option 2)
npm run build
# Then upload dist/ folder to Hostinger
```

---

## 🎯 Recommended Setup

**For easiest workflow, use Option 1:**

1. **Deploy to Vercel** (one-time setup)
2. **Make changes in Cursor**
3. **Push to GitHub** (git commands)
4. **Vercel auto-deploys** (automatic!)
5. **Share Vercel URL** with Hostinger

**No manual builds or uploads needed!** 🚀

---

## ⚡ Quick Tips

### Git Commands (You'll use these often)

```bash
# See what changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Fixed login page styling"

# Push to GitHub
git push

# If you need to pull latest changes
git pull
```

### Vercel Auto-Deployment

- ✅ Every push to `main` branch = automatic production deployment
- ✅ Every pull request = preview deployment
- ✅ Build logs available in Vercel dashboard
- ✅ Rollback to previous version if needed

---

## 🔧 Troubleshooting

### Changes not showing on Vercel?
- Check Vercel dashboard for build status
- Verify you pushed to the correct branch
- Check build logs in Vercel

### Need to update Hostinger manually?
- Run `npm run build`
- Upload `dist/` folder contents
- Clear browser cache

---

## 📞 Summary

**Simplest Workflow:**
1. Edit in Cursor
2. `git add . && git commit -m "message" && git push`
3. Vercel auto-deploys
4. Done! ✅

**No manual builds or uploads needed when using Vercel!**
