# Environment Variables Setup Guide

## Required Variables

### For Memories Feature

| Variable | Where to Get It | Where to Set It |
|----------|----------------|-----------------|
| `NETLIFY_TOKEN` | [Netlify User Applications](https://app.netlify.com/user/applications) | Netlify Site Settings → Environment Variables |
| `NETLIFY_FORM_ID_MEMORIES` | Netlify Dashboard → Forms → memories form URL | Netlify Site Settings → Environment Variables |

### For Carpool Feature (when ready)

| Variable | Where to Get It | Where to Set It |
|----------|----------------|-----------------|
| `NETLIFY_FORM_ID_CARPOOL` | Netlify Dashboard → Forms → carpool form URL | Netlify Site Settings → Environment Variables |

## Step-by-Step: Getting Your Netlify Token

1. **Log in to Netlify**: https://app.netlify.com
2. **Go to User Settings**: Click your avatar → User settings
3. **Navigate to Applications**: Click "Applications" in sidebar
4. **Create New Token**:
   - Scroll to "Personal access tokens"
   - Click "New access token"
   - Name: `Stacy Party Site API` (or any name you prefer)
   - Click "Generate token"
5. **Copy the Token**: ⚠️ You'll only see it once!
   - Save it somewhere secure
   - You'll use this as `NETLIFY_TOKEN`

## Step-by-Step: Getting Your Form IDs

### First Time Setup (Form doesn't exist yet)

1. **Deploy your site** to Netlify
2. **Visit the form page** on your live site (e.g., `/memories`)
3. **Submit a test entry** to activate the form
4. **Wait a few minutes** for Netlify to process

### Getting the Form ID

1. **Go to your Netlify Site Dashboard**
2. **Click "Forms"** in the left navigation
3. **Find your form** in the list:
   - "memories" for the memories feature
   - "carpool" for the carpool feature
4. **Click on the form name**
5. **Copy the Form ID** from the URL:
   ```
   https://app.netlify.com/sites/YOUR-SITE/forms/5f8a4b2c3d1e9f7a6b5c4d3e
                                                    ^^^^^^^^^^^^^^^^^^^^^^^^
                                                    This is your Form ID
   ```

## Adding Variables to Netlify (Production)

1. Go to your site in Netlify Dashboard
2. **Site settings** → **Environment variables**
3. Click **Add a variable**
4. **For each variable**:
   - Variable name: `NETLIFY_TOKEN` (exact name, case-sensitive)
   - Value: (paste your token)
   - Scopes: All (default)
   - Click "Create variable"
5. **Important**: After adding all variables, **trigger a new deploy**
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Clear cache and deploy site"

## Local Development Setup (Optional)

If you want to test locally with `npm run dev:netlify`:

1. **Create a `.env` file** in the project root:
   ```bash
   # .env (this file should NOT be committed to git)
   NETLIFY_TOKEN=your_actual_token_here
   NETLIFY_FORM_ID_MEMORIES=your_actual_form_id_here
   ```

2. **Run with Netlify CLI**:
   ```bash
   npm run dev:netlify
   ```

**Note**: The `.env` file is already in `.gitignore`, so it won't be committed to your repo.

## Verification Checklist

After setting up environment variables:

- [ ] Variables show in Netlify Site Settings → Environment Variables
- [ ] Site has been redeployed after adding variables
- [ ] Function logs show no "Missing NETLIFY_TOKEN" errors
- [ ] Form submissions appear in Netlify Forms dashboard
- [ ] Memories/carpool data loads on the website

## Troubleshooting

### "Missing NETLIFY_TOKEN or NETLIFY_FORM_ID_MEMORIES"

**Cause**: Environment variables not set or not deployed
**Fix**: 
1. Verify variables in Site Settings
2. Check for typos in variable names (case-sensitive!)
3. Redeploy your site

### "Failed to load memories" / 500 Error

**Cause**: Token or Form ID is incorrect
**Fix**:
1. Verify your Form ID matches exactly
2. Generate a new token if the old one was invalid
3. Check function logs in Netlify for specific error

### Form ID returns empty array

**Cause**: Form hasn't received submissions yet
**Fix**:
1. Submit a test entry through the live site
2. Check Netlify Forms dashboard to see if it appeared
3. If not, check that form has `data-netlify="true"` and correct `name` attribute

## Security Notes

🔒 **Keep your token secure!**
- Never commit `.env` files to git
- Never share your token publicly
- Treat it like a password
- Regenerate if compromised

🔒 **The token has full access to your Netlify account**
- Can read all form submissions
- Can deploy sites
- Can modify settings
- Keep it safe!

## Quick Reference Card

```
# Production (Netlify Dashboard)
NETLIFY_TOKEN=nfp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NETLIFY_FORM_ID_MEMORIES=5f8a4b2c3d1e9f7a6b5c4d3e

# Local Development (.env file)
NETLIFY_TOKEN=nfp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NETLIFY_FORM_ID_MEMORIES=5f8a4b2c3d1e9f7a6b5c4d3e
```

---

**Still stuck?** Check the function logs in Netlify for specific error messages!

