# Connect gnanova.pro Domain to Vercel

## 🎯 Goal
Connect your Hostinger domain `gnanova.pro` to your Vercel deployment at `https://gnanova-ai.vercel.app/`

---

## Step 1: Add Domain in Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Select your project: `gnanova-ai`

2. **Go to Settings → Domains**
   - Click "Settings" tab
   - Click "Domains" in the left sidebar

3. **Add Your Domain**
   - In the "Domains" section, click "Add" or "Add Domain"
   - Enter: `gnanova.pro`
   - Click "Add"

4. **Vercel will show DNS instructions**
   - It will display DNS records you need to add
   - **Note these down** - you'll need them in Hostinger
   - Usually shows:
     - Type: `A` or `CNAME`
     - Name: `@` or `www` or blank
     - Value: Vercel's IP address or domain

---

## Step 2: Configure DNS in Hostinger

1. **Log into Hostinger hPanel**
   - Go to [hpanel.hostinger.com](https://hpanel.hostinger.com)
   - Log in to your account

2. **Go to DNS Management**
   - Find "Domains" section
   - Click on your domain `gnanova.pro`
   - Click "DNS / Name Servers" or "DNS Zone Editor"

3. **Add DNS Records**
   
   **For Root Domain (gnanova.pro):**
   - **Type:** `A` or `CNAME` (Vercel will tell you which)
   - **Name:** `@` or leave blank (for root domain)
   - **Value:** The value Vercel provided (usually an IP or `cname.vercel-dns.com`)
   - **TTL:** `3600` or leave default
   - Click "Add Record" or "Save"

   **For WWW Subdomain (www.gnanova.pro):**
   - **Type:** `CNAME`
   - **Name:** `www`
   - **Value:** `cname.vercel-dns.com` or what Vercel shows
   - **TTL:** `3600` or leave default
   - Click "Add Record" or "Save"

4. **Remove Conflicting Records** (if any)
   - If there are existing `A` records pointing elsewhere, you may need to remove or update them
   - Check for any records that might conflict

---

## Step 3: Wait for DNS Propagation

1. **DNS changes take time**
   - Usually 5-30 minutes
   - Can take up to 24 hours (rare)

2. **Check Status in Vercel**
   - Go back to Vercel → Settings → Domains
   - You'll see the domain status
   - It will show "Valid Configuration" when ready

3. **Test Your Domain**
   - Try visiting `https://gnanova.pro`
   - Try visiting `https://www.gnanova.pro`
   - Both should work!

---

## Step 4: SSL Certificate (Automatic)

- ✅ Vercel automatically provides SSL certificates
- ✅ Your site will have HTTPS automatically
- ✅ No additional configuration needed
- ✅ Usually activates within minutes after DNS is configured

---

## 📋 Common DNS Record Types

### Option A: A Record (IP Address)
```
Type: A
Name: @
Value: 76.76.21.21 (example - Vercel will provide the actual IP)
TTL: 3600
```

### Option B: CNAME Record (Domain)
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

**Note:** Vercel will tell you exactly which records to add. Follow their instructions!

---

## 🔍 Verify DNS Configuration

### Check if DNS is working:

1. **In Vercel Dashboard:**
   - Settings → Domains
   - Should show "Valid Configuration" with green checkmark

2. **Using Online Tools:**
   - Visit [whatsmydns.net](https://www.whatsmydns.net)
   - Enter `gnanova.pro`
   - Check if it points to Vercel

3. **Test in Browser:**
   - Visit `https://gnanova.pro`
   - Should show your website

---

## ⚠️ Troubleshooting

### Domain Not Working?

1. **Check DNS Records:**
   - Verify records are added correctly in Hostinger
   - Make sure values match exactly what Vercel shows
   - Check for typos

2. **Wait Longer:**
   - DNS propagation can take time
   - Clear browser cache
   - Try incognito/private mode

3. **Check Vercel Status:**
   - Go to Settings → Domains
   - Look for error messages
   - Vercel will show what's wrong

4. **Verify Domain Ownership:**
   - Make sure you own the domain
   - Check domain is active in Hostinger

### Common Issues:

- **"Invalid Configuration"** - DNS records not set correctly
- **"Pending"** - Still waiting for DNS propagation
- **"Error"** - Check DNS records match Vercel's requirements

---

## ✅ Success Checklist

- [ ] Domain added in Vercel
- [ ] DNS records added in Hostinger
- [ ] DNS records match Vercel's requirements
- [ ] Domain shows "Valid Configuration" in Vercel
- [ ] `https://gnanova.pro` loads your website
- [ ] `https://www.gnanova.pro` also works
- [ ] SSL certificate is active (HTTPS works)

---

## 🎉 After Setup

Once connected:
- Your site will be accessible at `https://gnanova.pro`
- Vercel will automatically handle HTTPS/SSL
- All deployments will work on your custom domain
- You can remove the `vercel.app` URL or keep it as backup

---

## 📞 Need Help?

- **Vercel Support:** Check domain status in dashboard
- **Hostinger Support:** Help with DNS configuration
- **DNS Checker:** Use [whatsmydns.net](https://www.whatsmydns.net) to verify

---

**Your website will be live at `https://gnanova.pro` once DNS is configured!** 🚀
