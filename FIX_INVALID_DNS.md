# Fix "Invalid Configuration" for gnanova.pro

## 🔴 Current Status

Your Vercel dashboard shows:
- ✅ `gnanova.pro` - Added but "Invalid Configuration"
- ✅ `www.gnanova.pro` - Added but "Invalid Configuration"  
- ✅ `gnanova-ai.vercel.app` - Working fine

**This means:** DNS records are not configured correctly in Hostinger yet.

---

## ✅ How to Fix

### Step 1: Get DNS Records from Vercel

1. **In Vercel Dashboard:**
   - Go to Settings → Domains
   - Click on `gnanova.pro` (or click "Learn more")
   - Vercel will show you the exact DNS records needed

2. **You'll see something like:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Note these down** - you'll need them for Hostinger

---

### Step 2: Add DNS Records in Hostinger

1. **Log into Hostinger hPanel**
   - Go to [hpanel.hostinger.com](https://hpanel.hostinger.com)

2. **Go to DNS Settings:**
   - Click "Domains" in the menu
   - Click on `gnanova.pro`
   - Click "DNS / Name Servers" or "DNS Zone Editor"

3. **Add the DNS Records:**
   
   **For Root Domain (gnanova.pro):**
   - **Type:** `A` (or what Vercel shows)
   - **Name:** `@` or leave blank
   - **Value:** The IP address Vercel provided
   - **TTL:** `3600` or default
   - Click "Add Record"

   **For WWW (www.gnanova.pro):**
   - **Type:** `CNAME`
   - **Name:** `www`
   - **Value:** `cname.vercel-dns.com` (or what Vercel shows)
   - **TTL:** `3600` or default
   - Click "Add Record"

4. **Remove Conflicting Records:**
   - If there are old A records pointing elsewhere, remove or update them
   - Make sure no conflicting records exist

---

### Step 3: Wait and Verify

1. **Wait for DNS Propagation:**
   - Usually 5-30 minutes
   - Can take up to 24 hours (rare)

2. **Check Status in Vercel:**
   - Go back to Settings → Domains
   - Click "Refresh" button
   - Status should change to "Valid Configuration" ✅

3. **Test Your Domain:**
   - Visit `https://gnanova.pro`
   - Visit `https://www.gnanova.pro`
   - Both should show your website!

---

## 🔍 What "Invalid Configuration" Means

- ❌ DNS records not added in Hostinger
- ❌ DNS records pointing to wrong location
- ❌ DNS records not propagated yet
- ❌ Conflicting DNS records

---

## 📋 Quick Checklist

- [ ] Clicked "Learn more" in Vercel to see DNS records
- [ ] Added A record for `gnanova.pro` in Hostinger
- [ ] Added CNAME record for `www.gnanova.pro` in Hostinger
- [ ] Removed any conflicting DNS records
- [ ] Waited 5-30 minutes for DNS propagation
- [ ] Clicked "Refresh" in Vercel
- [ ] Status changed to "Valid Configuration" ✅
- [ ] Tested `https://gnanova.pro` - works! 🎉

---

## ⚠️ Common Issues

### Still Shows "Invalid Configuration" After Adding DNS?

1. **Check DNS Records Match Exactly:**
   - Values must match Vercel's requirements exactly
   - No typos or extra spaces

2. **Wait Longer:**
   - DNS can take time to propagate
   - Try again in 30 minutes

3. **Check for Conflicting Records:**
   - Remove old A records
   - Make sure only Vercel records exist

4. **Verify in Hostinger:**
   - Go back to DNS settings
   - Confirm records are saved correctly

### DNS Records Not Showing in Hostinger?

- Make sure you're in the right domain's DNS settings
- Check if you have permission to edit DNS
- Contact Hostinger support if needed

---

## 💡 Pro Tip

**Use Vercel's DNS Checker:**
- In Vercel → Settings → Domains
- Click on your domain
- Vercel will show what's wrong and how to fix it

---

## 🎯 Expected Result

After fixing DNS:
- ✅ `gnanova.pro` → "Valid Configuration" (green checkmark)
- ✅ `www.gnanova.pro` → "Valid Configuration" (green checkmark)
- ✅ `https://gnanova.pro` → Your website loads!
- ✅ `https://www.gnanova.pro` → Your website loads!
- ✅ SSL certificate automatically configured

---

## 📞 Need Help?

1. **Click "Learn more" in Vercel** - Shows exact DNS records needed
2. **Contact Hostinger Support** - They can help add DNS records
3. **Check Vercel Docs** - [vercel.com/docs](https://vercel.com/docs)

---

**Once DNS is configured correctly, both domains will show "Valid Configuration" and your site will be live at `https://gnanova.pro`!** 🚀
