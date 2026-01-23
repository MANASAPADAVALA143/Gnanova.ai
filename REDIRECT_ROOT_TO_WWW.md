# Redirect gnanova.pro to www.gnanova.pro

## 🎯 Goal
Set up redirect so `gnanova.pro` automatically redirects to `www.gnanova.pro`

---

## ✅ Step-by-Step Instructions

### Step 1: Go to Vercel Domain Settings

1. **Log into Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Select your project: `gnanova-ai`

2. **Navigate to Domains**
   - Click **"Settings"** tab
   - Click **"Domains"** in the left sidebar
   - OR go directly to: Settings → Domains

### Step 2: Edit gnanova.pro Domain

1. **Find `gnanova.pro` in the domains list**
   - You'll see it listed with other domains

2. **Click "Edit"** next to `gnanova.pro`
   - This opens the domain configuration

### Step 3: Configure Redirect

1. **Select "Redirect to Another Domain"**
   - You'll see radio button options
   - Select **"Redirect to Another Domain"** (not "Connect to an environment")

2. **Choose Redirect Type**
   - Select **"307 Temporary Redirect"** (recommended)
   - OR **"308 Permanent Redirect"** (for permanent SEO redirect)
   - **307** is usually better for flexibility

3. **Enter Target Domain**
   - In the "Redirect to" field, enter: `www.gnanova.pro`
   - Make sure it's exactly: `www.gnanova.pro`

4. **Click "Save"**
   - The changes will be applied immediately

---

## ✅ Verify the Redirect

### Test 1: Visit the Domain
1. Open a new browser tab (or incognito/private mode)
2. Visit: `https://gnanova.pro`
3. **Should automatically redirect** to `https://www.gnanova.pro`
4. URL in address bar should change to `www.gnanova.pro`

### Test 2: Check in Vercel
1. Go back to Vercel → Settings → Domains
2. `gnanova.pro` should show:
   - Status: "Valid Configuration" or "Ready"
   - Configuration: "Redirects to www.gnanova.pro"
   - Redirect icon visible

---

## 📋 What Happens After Redirect

**Before:**
- `gnanova.pro` → Shows your website
- `www.gnanova.pro` → Shows your website

**After:**
- `gnanova.pro` → **Redirects to** → `www.gnanova.pro`
- `www.gnanova.pro` → Shows your website (primary)

**Result:**
- All traffic goes to `www.gnanova.pro`
- Better SEO (one canonical URL)
- Unified analytics

---

## ⚠️ Important Notes

### Redirect Types:

**307 Temporary Redirect:**
- ✅ Recommended for most cases
- ✅ Search engines understand it's temporary
- ✅ Can change later if needed
- ✅ Fast and reliable

**308 Permanent Redirect:**
- ✅ Better for permanent SEO
- ✅ Tells search engines it's permanent
- ⚠️ Harder to change later (browsers cache it)

**Recommendation:** Use **307 Temporary Redirect**

---

## 🔍 Troubleshooting

### Redirect Not Working?

1. **Clear Browser Cache:**
   - Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
   - Clear cached images and files
   - Try again

2. **Use Incognito/Private Mode:**
   - Open a new incognito window
   - Visit `https://gnanova.pro`
   - Should redirect

3. **Check Vercel Configuration:**
   - Go to Settings → Domains
   - Verify redirect is saved correctly
   - Check if status shows "Valid Configuration"

4. **Wait a Few Minutes:**
   - Changes can take 1-2 minutes to propagate
   - Try again after waiting

### Still Shows Website Instead of Redirect?

1. **Verify Configuration:**
   - Make sure "Redirect to Another Domain" is selected
   - Not "Connect to an environment"
   - Target domain is `www.gnanova.pro`

2. **Check DNS:**
   - Both domains should have valid DNS
   - Both should show "Valid Configuration" in Vercel

---

## ✅ Success Checklist

- [ ] Went to Vercel → Settings → Domains
- [ ] Clicked "Edit" on `gnanova.pro`
- [ ] Selected "Redirect to Another Domain"
- [ ] Chose "307 Temporary Redirect"
- [ ] Entered `www.gnanova.pro` as target
- [ ] Clicked "Save"
- [ ] Tested `https://gnanova.pro` - redirects to www ✅
- [ ] Verified in Vercel - shows redirect configuration ✅

---

## 🎉 Expected Result

After setup:
- ✅ `https://gnanova.pro` → Automatically redirects to `https://www.gnanova.pro`
- ✅ `https://www.gnanova.pro` → Shows your website
- ✅ All traffic unified to www version
- ✅ Better SEO (one canonical URL)
- ✅ Professional setup

---

**Follow these steps and your redirect will be set up!** 🚀
