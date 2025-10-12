# Memories Section - Quick Setup Checklist ✅

## Pre-Deployment
- [x] MemoryForm component created with Netlify Forms integration
- [x] MemoryFeed component fetches and displays memories
- [x] Serverless function (`memories-list.ts`) ready
- [x] Netlify redirects configured
- [x] TypeScript types defined

## Deployment Steps

### 1. Deploy to Netlify
- [ ] Push code to GitHub
- [ ] Ensure Netlify is connected to your repo
- [ ] Deploy completes successfully
- [ ] Note your site URL

### 2. Get API Credentials

#### Get Netlify Token
- [ ] Visit: https://app.netlify.com/user/applications
- [ ] Create new personal access token
- [ ] Name it: "Stacy Party Site API"
- [ ] Copy and save the token securely

#### Get Form ID
- [ ] Go to Netlify Dashboard → Your Site → Forms
- [ ] Click on "memories" form (appears after first deploy)
- [ ] Copy Form ID from URL bar
- [ ] It looks like: `5f8a4b2c3d1e9f7a6b5c4d3e`

### 3. Configure Environment Variables
- [ ] Go to Site Settings → Environment Variables
- [ ] Add `NETLIFY_TOKEN` with your token
- [ ] Add `NETLIFY_FORM_ID_MEMORIES` with your form ID
- [ ] Click "Save"
- [ ] **Trigger a new deployment** (important!)

### 4. Test Everything
- [ ] Visit `/memories` on your live site
- [ ] Submit a test memory with all fields
- [ ] See confetti animation ✨
- [ ] Check Netlify Forms dashboard for submission
- [ ] Refresh page - see memory appear in feed
- [ ] Test photo upload
- [ ] Test without photo
- [ ] Test required field validation

### 5. Optional: Local Development
- [ ] Create `.env` file with credentials
- [ ] Run `npm run dev:netlify`
- [ ] Test form submission locally
- [ ] Test API endpoints locally

## Troubleshooting Quick Fixes

**Memories not loading?**
- Check browser console for errors
- Verify function URL: `/.netlify/functions/memories-list`
- Check Netlify function logs

**Form not submitting?**
- Ensure `data-netlify="true"` is on form
- Check that form name is exactly "memories"
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

