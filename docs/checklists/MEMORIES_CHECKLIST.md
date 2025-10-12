# Memories Section - Quick Setup Checklist ✅

## Pre-Deployment
- [x] MemoryForm component created with Netlify Forms integration
- [x] MemoryFeed component fetches and displays memories
- [x] Serverless function (`memories-list.ts`) ready
- [x] Netlify redirects configured
- [x] TypeScript types defined
- [x] **Hidden forms added to `index.html`** ⚠️ (CRITICAL for React apps!)

## Deployment Steps

### 1. Deploy to Netlify
- [x] Push code to GitHub
- [x] Ensure Netlify is connected to your repo
- [x] Deploy completes successfully
- [x] Note your site URL

### 2. Get API Credentials

#### Get Netlify Token
- [x] Visit: https://app.netlify.com/user/applications
- [x] Create new personal access token
- [x] Name it: "Stacy Party Site API"
- [x] Copy and save the token securely

#### Get Form ID
- [x] Go to Netlify Dashboard → Your Site → Forms
- [x] Click on "memories" form (appears after first deploy)
- [x] Copy Form ID from URL bar
- [x] It looks like: `5f8a4b2c3d1e9f7a6b5c4d3e`

### 3. Configure Environment Variables
- [X] Go to Site Settings → Environment Variables
- [X] Add `NETLIFY_TOKEN` with your token
- [X] Add `NETLIFY_FORM_ID_MEMORIES` with your form ID
- [X] Click "Save"
- [x] **Trigger a new deployment** (important!)

### 4. Test Everything
- [x] Visit `/memories` on your live site
- [x] Submit a test memory with all fields
- [x] See confetti animation ✨
- [x] Check Netlify Forms dashboard for submission
- [x] Refresh page - see memory appear in feed
- [x] Test photo upload
- [x] Test without photo
- [x] Test required field validation

### 5. Optional: Local Development
- [x] Create `.env` file with credentials
- [x] Run `npm run dev:netlify`
- [x] Test form submission locally
- [x] Test API endpoints locally

## Troubleshooting Quick Fixes

**Memories not loading?**
- Check browser console for errors
- Verify function URL: `/.netlify/functions/memories-list`
- Check Netlify function logs

**Form not detected by Netlify?**
- ✅ Hidden form already added to `index.html`
- Redeploy after making changes
- Check Netlify build logs for form detection confirmation

**Form not submitting?**
- Ensure `data-netlify="true"` is on React form
- Check that form name is exactly "memories" (matches hidden form)
- Look for errors in Netlify Forms dashboard

**Missing environment variables error?**
- Redeploy after adding env vars
- Double-check variable names (exact match required)

## Success Indicators ✨

You'll know it's working when:
1. ✅ Form submission shows confetti
2. ✅ Submission appears in Netlify Forms dashboard
3. ✅ Memory displays in the feed (right panel)
4. ✅ Photo uploads and displays correctly
5. ✅ No console errors
6. ✅ Loading state shows briefly then memories appear

## Ready for Production? 

Once tested:
- [ ] Remove any test memories from Netlify Forms dashboard
- [ ] Consider enabling form notifications (email on new submission)
- [ ] Share the `/memories` link with guests
- [ ] Monitor for spam (honeypot field helps prevent this)

---

**Need help?** Check `MEMORIES_SETUP.md` for detailed instructions!

