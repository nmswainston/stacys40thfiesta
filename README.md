# Stacy's 40th — React + Tailwind v4 (Netlify-ready)

## Quick start
```bash
npm i
npm run dev
```

## Content editing
Update `src/siteData.js` for dates, schedule, Zelle handle, FAQ, and memories upload mode.
Add a denim PNG to `public/assets/denim.png` for the hero background vibe.

## Forms
RSVP + Memories use Netlify Forms by default. Switch Memories to Cloudinary by setting
`memories.upload.method = "cloudinary"` and adding `cloudName` + `uploadPreset`.

## Slideshow
Visit `/slideshow` — it pulls submissions from Netlify via a serverless function.
Set env vars in Netlify:
- `NETLIFY_TOKEN`
- `NETLIFY_FORM_ID_MEMORIES`
```