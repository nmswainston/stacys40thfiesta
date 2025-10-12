# Memories Section - Setup Guide

## Overview
The memories section allows guests to share their favorite Stacy memories with optional photos. Submissions are stored via Netlify Forms and displayed in real-time on the site.

## Architecture

### Frontend Components
- **`MemoryForm.tsx`** - Form for submitting memories (uses Netlify Forms)
- **`MemoryFeed.tsx`** - Displays all approved memories
- **`Memories.jsx`** - Main route combining form and feed

### Backend
- **`netlify/functions/memories-list.ts`** - Serverless function that fetches submissions from Netlify Forms API
- Uses Netlify Forms API to retrieve and format memory submissions

## Setup Instructions

### 1. Ensure Hidden Forms Are Present (CRITICAL!)

⚠️ **For React/SPA apps**: Netlify Forms detection requires a static HTML form in your `index.html`. 

✅ **Already Done!** Your `index.html` now includes hidden forms for:
- `memories` - Memory wall submissions
- `rsvp` - RSVP form
- `carpool` - Carpool coordination

These hidden forms allow Netlify to detect your forms at build time, even though the actual forms are rendered by React.

### 2. Deploy Your Site
```bash
npm run build
# Push to GitHub and deploy via Netlify
```

Once deployed, Netlify will automatically detect the hidden forms in your `index.html`.

### 3. Get Your Netlify Personal Access Token

1. Visit: https://app.netlify.com/user/applications
2. Scroll to "Personal access tokens"
3. Click "New access token"
4. Name it: "Stacy Party Site API"
5. Copy the token (you won't see it again!)

### 4. Get Your Form ID

1. Go to your Netlify dashboard
2. Select your site
3. Click on "Forms" in the navigation
4. Click on the "memories" form
5. The Form ID is in the URL: `https://app.netlify.com/sites/YOUR-SITE/forms/FORM-ID-HERE`
6. Copy the long alphanumeric Form ID

### 5. Add Environment Variables to Netlify

1. In your Netlify site dashboard, go to: **Site Settings → Environment Variables**
2. Add the following variables:

   | Variable Name | Value |
   |--------------|-------|
   | `NETLIFY_TOKEN` | Your personal access token from step 3 |
   | `NETLIFY_FORM_ID_MEMORIES` | Your form ID from step 4 |

3. Click "Save"
4. **Important:** Redeploy your site for the environment variables to take effect

### 6. Test the Flow

1. **Submit a test memory:**
   - Go to your site's `/memories` route
   - Fill out the form with test data
   - Upload a test photo (optional)
   - Click "Share Memory"
   - You should see confetti! 🎉

2. **Verify in Netlify:**
   - Go to Forms → memories
   - Your submission should appear there

3. **Check if it displays:**
   - Refresh the `/memories` page
   - Your memory should appear in the feed on the right side

## Testing Locally

To test the serverless functions locally:

```bash
npm run dev:netlify
```

This uses Netlify CLI to simulate the serverless functions environment.

**Note:** You'll need to create a `.env` file with your environment variables for local testing:

```env
NETLIFY_TOKEN=your_token_here
NETLIFY_FORM_ID_MEMORIES=your_form_id_here
```

## Form Fields

The form captures:
- **name** (required) - Guest's name
- **email** (optional) - For contact, never displayed publicly
- **message** (required) - The memory text
- **photo** (optional) - Image upload

## Features

### Security
- Honeypot field (`website`) for spam prevention
- HTML tags are stripped from submissions
- Email addresses are never displayed publicly

### User Experience
- Confetti animation on successful submission
- Real-time feed updates
- Loading and error states
- Responsive design with glassmorphism effects
- Photo upload support with preview

### API Response Format

The `memories-list` function returns:
```json
{
  "memories": [
    {
      "id": "submission-id",
      "name": "Guest Name",
      "message": "The memory text",
      "photoUrl": "https://...",
      "createdAt": "2025-10-12T00:00:00.000Z"
    }
  ]
}
```

Memories are sorted newest first.

## Troubleshooting

### "Missing NETLIFY_TOKEN or NETLIFY_FORM_ID_MEMORIES" error
- Environment variables are not set or site needs to be redeployed
- Go to Site Settings → Environment Variables and verify they're set
- Trigger a new deployment

### Form not detected by Netlify
- ✅ **Solution**: Hidden form must exist in `index.html` (already added!)
- Verify the hidden form has `name="memories"` and `netlify` attribute
- Redeploy after adding the hidden form

### Form submissions not appearing
- Check Netlify Forms dashboard to see if submissions are being captured
- Verify the form name matches exactly: `name="memories"`
- Ensure `data-netlify="true"` is on the React form element
- Confirm hidden form in `index.html` has matching field names

### Photos not uploading
- Form must have `encType="multipart/form-data"`
- File input must have `name="photo"` attribute
- Check Netlify Forms file upload limits (10MB default)

### Function errors
- Check function logs in Netlify: Functions → memories-list → Function log
- Verify the form ID is correct
- Ensure the token has proper permissions

## Next Steps After Setup

Once memories are flowing:
1. Monitor submissions in Netlify Forms dashboard
2. You can moderate/delete inappropriate submissions there
3. Approved submissions automatically appear on the site
4. Consider setting up email notifications for new submissions

## File Upload Notes

- Netlify Forms supports files up to 10MB
- Uploaded files are stored on Netlify's servers
- File URLs are accessible via the Forms API
- Images are displayed with responsive sizing (max-height: 256px)

## Cost Considerations

- Netlify Forms: 100 submissions/month on free tier
- Function invocations: 125k/month on free tier
- Bandwidth: 100GB/month on free tier

For a party site, these limits should be more than sufficient!

