# Fix gnanova.pro Domain Configuration

## 🔴 Current Issue

Your `gnanova.pro` is configured to:
- ❌ **Redirect** to `www.gnanova.pro` (307 Temporary Redirect)
- ❌ Shows "Invalid Configuration"

**This means:** The root domain redirects instead of serving your site directly.

---

## ✅ Fix: Change to Serve Site (Not Redirect)

### Step 1: Change Domain Configuration in Vercel

1. **In the domain configuration page you're on:**
   - Find "Connect to an environment" option
   - **Select "Connect to an environment"** (instead of "Redirect to Another Domain")
   - Choose "Production" from the dropdown

2. **Remove the redirect:**
   - Unselect "Redirect to Another Domain"
   - Select "Connect to an environment" → "Production"

3. **Click "Save"**

### Step 2: Get DNS Records

After saving, Vercel will show:
- DNS records needed for `gnanova.pro`
- Usually an A record or CNAME

**Note these down!**

---

## 🎯 What You Want

**Both domains should serve your site:**
- ✅ `gnanova.pro` → Your website (not redirect)
- ✅ `www.gnanova.pro` → Your website (not redirect)

**OR (if you prefer redirect):**
- ✅ `gnanova.pro` → Redirects to `www.gnanova.pro`
- ✅ `www.gnanova.pro` → Your website

---

## 📋 Recommended Setup

### Option A: Both Serve Site (Recommended)

1. **`gnanova.pro`:**
   - Select "Connect to an environment" → "Production"
   - Save

2. **`www.gnanova.pro`:**
   - Should already be connected to Production
   - Both domains serve your site

### Option B: Redirect Root to WWW

1. **`gnanova.pro`:**
   - Keep redirect to `www.gnanova.pro` (current setup)
   - This is fine if you prefer www version

2. **`www.gnanova.pro`:**
   - Connected to Production
   - This serves your site

---

## 🔧 Next Steps After Fixing Configuration

1. **Change configuration** (as above)
2. **Get DNS records from Vercel**
3. **Add DNS records in Hostinger:**
   - Go to Hostinger hPanel
   - Domains → `gnanova.pro` → DNS settings
   - Add the DNS records Vercel shows
4. **Wait for DNS propagation** (5-30 minutes)
5. **Click "Refresh" in Vercel**
6. **Status should change to "Valid Configuration"** ✅

---

## ⚠️ Important

- **If you keep the redirect:** `gnanova.pro` will redirect to `www.gnanova.pro`
- **If you connect to environment:** Both domains will serve your site directly
- **DNS records are still needed** either way!

---

## ✅ Quick Fix

**Right now, in the page you're on:**

1. **Select "Connect to an environment"** (radio button)
2. **Choose "Production"** from dropdown
3. **Unselect "Redirect to Another Domain"**
4. **Click "Save"**

Then get DNS records and add them in Hostinger!

---

**After fixing the configuration and DNS, your site will be live at `https://gnanova.pro`!** 🚀
