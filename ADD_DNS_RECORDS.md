# Add DNS Records in Hostinger - Exact Steps

## 📋 DNS Records You Need to Add

From your Vercel dashboard, I can see:

### For `gnanova.pro` (Root Domain):
- **Type:** `A`
- **Name:** `@` (or leave blank)
- **Value:** `216.198.79.1`

### For `www.gnanova.pro`:
- Click "Learn more" on `www.gnanova.pro` to see its DNS record
- Usually it's a CNAME record pointing to `cname.vercel-dns.com`

---

## ✅ Step-by-Step: Add DNS in Hostinger

### Step 1: Log into Hostinger

1. Go to [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Log in to your account

### Step 2: Go to DNS Settings

1. Click **"Domains"** in the left menu
2. Click on **`gnanova.pro`**
3. Click **"DNS / Name Servers"** or **"DNS Zone Editor"**

### Step 3: Add A Record for Root Domain

1. **Click "Add Record"** or **"Add DNS Record"**
2. Fill in:
   - **Type:** Select `A`
   - **Name:** Enter `@` or leave blank (for root domain)
   - **Value:** Enter `216.198.79.1`
   - **TTL:** `3600` or leave default
3. **Click "Save"** or **"Add Record"**

### Step 4: Check WWW Subdomain DNS Record

1. **Go back to Vercel**
2. **Click "Learn more"** on `www.gnanova.pro`
3. **Note the DNS record** it shows (usually CNAME)
4. **Add that record in Hostinger** too

### Step 5: Remove Conflicting Records (If Any)

- Check if there are old A records pointing elsewhere
- Remove or update any conflicting records
- Make sure only Vercel records exist

---

## 📝 Quick Reference

**What to add in Hostinger DNS:**

```
Record 1:
Type: A
Name: @ (or blank)
Value: 216.198.79.1
TTL: 3600

Record 2 (check Vercel for exact value):
Type: CNAME (usually)
Name: www
Value: (check Vercel for www.gnanova.pro)
TTL: 3600
```

---

## ⏱️ After Adding DNS

1. **Wait 5-30 minutes** for DNS propagation
2. **Go back to Vercel**
3. **Click "Refresh"** next to your domains
4. **Status should change** to "Valid Configuration" ✅

---

## 🔍 Verify DNS is Working

### Check 1: In Vercel
- Settings → Domains
- Click "Refresh"
- Should show "Valid Configuration" (green checkmark)

### Check 2: Visit Your Domain
- Go to `https://gnanova.pro`
- Should show your website!

### Check 3: DNS Checker
- Visit [whatsmydns.net](https://www.whatsmydns.net)
- Enter `gnanova.pro`
- Should show it points to Vercel

---

## ⚠️ Important Notes

- **Use the exact values** from Vercel (216.198.79.1)
- **Don't add extra spaces** or characters
- **Wait for DNS propagation** (can take time)
- **Remove old conflicting records** if they exist

---

## 🎯 Expected Result

After adding DNS records:
- ✅ `gnanova.pro` → "Valid Configuration" in Vercel
- ✅ `www.gnanova.pro` → "Valid Configuration" in Vercel
- ✅ `https://gnanova.pro` → Your website loads!
- ✅ `https://www.gnanova.pro` → Your website loads!
- ✅ SSL certificate automatically configured

---

## 📞 If You Need Help

1. **Check Vercel** - Shows exact DNS records needed
2. **Contact Hostinger Support** - They can help add DNS records
3. **Verify in Vercel** - Click "Refresh" to check status

---

**Add the A record (216.198.79.1) in Hostinger DNS settings, then check www.gnanova.pro for its DNS record!** 🚀
