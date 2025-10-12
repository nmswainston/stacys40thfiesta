# Stacy's 40th Fiesta

A modern, responsive event website built with React, TypeScript, Tailwind CSS v4, and deployed on Netlify with serverless functions.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to view the site locally.

## 📋 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run dev:netlify` - Start Netlify dev server (for testing functions)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run optimize-images` - Convert images to WebP format (requires optional `sharp` dependency)

## 🎨 Features

### Pages & Routes
- **Home** (`/`) - Single-page scroll with all main sections
- **Agenda** (`/agenda`) - Event schedule with icons and cost estimates
- **RSVP** (`/rsvp`) - Guest registration form with Zelle payment info
- **Stay** (`/stay`) - Airbnb accommodation details with photo gallery
- **Memories** (`/memories`) - Photo/message submission feed
- **Slideshow** (`/slideshow`) - Full-screen slideshow of submitted memories
- **Travel** (`/travel`) - Travel tips and FAQ
- **Carpool** - Bulletin board for coordinating rides (embedded in home)

### Key Features
- **Responsive Design** - Mobile-first, works on all devices
- **Western Theme** - Custom desert/rodeo aesthetic with SVG decorations
- **Form Integrations** - Netlify Forms for RSVP, memories, and carpool
- **Serverless Functions** - Netlify Functions to fetch form submissions
- **Image Optimization** - Responsive images with WebP support
- **Confetti Effects** - Celebration animations on form submissions
- **Back to Top Button** - Smooth scrolling navigation
- **Error Boundaries** - Graceful error handling

## 🎯 Content Editing

All site content is centralized in **`src/data/siteData.ts`**. Update this file to change:

- Event dates and location
- Hero text and CTAs
- Section headings and descriptions
- Agenda items (with times, costs, links)
- RSVP form labels and payment details
- Airbnb amenities and links
- FAQ questions and answers
- Navigation items

## 📝 Forms

The site uses **Netlify Forms** for all form submissions:

1. **RSVP Form** - Guest registration with party size
2. **Memories Form** - Photo/message uploads (Netlify file uploads)
3. **Carpool Form** - Driver/rider coordination

Forms are configured in `netlify.toml` and components use the `NetlifyForm` wrapper.

### Alternative: Cloudinary for Memories

To switch the Memories form to Cloudinary for image uploads:

1. Update `src/data/siteData.ts`:
   ```ts
   memories: {
     upload: {
       method: "cloudinary",
       cloudinary: {
         cloudName: "your-cloud-name",
         uploadPreset: "your-upload-preset"
       }
     }
   }
   ```

2. Add Cloudinary widget script to `index.html` if needed.

## 🎭 Slideshow

The `/slideshow` route displays submitted memories in a full-screen slideshow format.

**Required Netlify Environment Variables:**
- `NETLIFY_TOKEN` - Netlify personal access token
- `NETLIFY_FORM_ID_MEMORIES` - Form ID for the memories form

Set these in your Netlify dashboard under Site Settings → Environment Variables.

## 🖼️ Images

Images are stored in `public/assets/`:
- SVG icons for agenda items, navigation, and decorative elements
- Airbnb photos in `public/assets/airbnb/` directory
- Western-themed background graphics

Use `ResponsiveImage` component for optimized image loading.

## 🎨 Styling

- **Tailwind CSS v4** with `@tailwindcss/postcss` plugin
- Custom theme tokens in `tailwind.config.js`
- Global styles in `src/styles/globals.css`
- Design tokens in `src/styles/tokens.css`
- Glassmorphism effects with `GlassPanel` component

## 🚀 Deployment

The site is configured for **Netlify** deployment:

1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set required environment variables for slideshow functionality
5. Netlify Functions are automatically deployed from `netlify/functions/`

The `netlify.toml` file handles redirects and function configuration.

## 📁 Project Structure

```
src/
├── app/              # App wrapper and layouts
├── components/       # Reusable UI components
├── constants/        # Date constants and routes
├── data/             # Site content (siteData.ts)
├── features/         # Feature-specific components (carpool, memories)
├── hooks/            # Custom React hooks
├── lib/              # Utilities and API helpers
├── routes/           # Page components
├── styles/           # Global CSS and tokens
└── types/            # TypeScript type definitions

netlify/functions/    # Serverless functions
public/assets/        # Static images and SVG files
docs/                 # Project documentation
```

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS v4** for styling
- **React Router v6** for routing
- **Canvas Confetti** for celebration effects
- **Netlify** for hosting and serverless functions

## 📚 Documentation

Additional documentation is available in the `docs/` directory:
- Implementation guides for major features
- Performance optimization reports
- Setup instructions for various components
- Checklists for development workflows

## 🤝 Contributing

When making changes:
1. Update `siteData.ts` for content changes
2. Run `npm run type-check` before committing
3. Test forms locally with `npm run dev:netlify`
4. Optimize new images with `npm run optimize-images`

---

Built with ❤️ for Stacy's 40th birthday celebration in Rocky Point, Mexico 🌵🎉
