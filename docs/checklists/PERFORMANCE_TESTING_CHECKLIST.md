# Performance Testing Checklist

Use this checklist to verify the performance optimizations are working correctly.

---

## ✅ Build Verification

- [x] Run `npm run build` successfully
- [x] Verify chunk splitting in build output
- [x] Confirm React vendor bundle is separate (~206 kB)
- [x] Confirm confetti is in separate chunk (~10.66 kB)
- [x] Verify routes are lazy-loaded (7 separate chunks)

---

## 🔍 Network Tab Testing

### Initial Page Load
- [ ] Open Network tab in Chrome DevTools
- [ ] Load homepage and verify only main chunks load
- [ ] Confirm route chunks (Stay, Agenda, etc.) are NOT loaded initially
- [ ] Verify preconnect to `stacys40thfiesta.com` appears in Network tab

### Route Navigation
- [ ] Navigate to `/stay` and verify Stay chunk loads
- [ ] Navigate to `/agenda` and verify Agenda chunk loads  
- [ ] Navigate to `/rsvp` and verify RSVP chunk loads
- [ ] Navigate to `/slideshow` and verify Slideshow chunk loads
- [ ] Check that chunks are cached on subsequent visits (from disk cache)

### Interaction Testing
- [ ] Click RSVP button on homepage
- [ ] Verify confetti chunk loads on demand
- [ ] Verify confetti plays successfully
- [ ] Scroll to Memories section
- [ ] Verify MemoryForm and MemoryFeed chunks load on scroll
- [ ] Scroll to Carpool section
- [ ] Verify CarpoolForm and CarpoolBulletinBoard chunks load

---

## 📊 Lighthouse Audit

Run Lighthouse audit in Chrome DevTools:

### Desktop
- [ ] Performance score: Target 90+
- [ ] Accessibility: Target 95+
- [ ] Best Practices: Target 100
- [ ] SEO: Target 100

### Mobile
- [ ] Performance score: Target 85+
- [ ] Accessibility: Target 95+
- [ ] Best Practices: Target 100
- [ ] SEO: Target 100

### Key Metrics to Check
- [ ] First Contentful Paint (FCP): < 1.8s
- [ ] Largest Contentful Paint (LCP): < 2.5s
- [ ] Time to Interactive (TTI): < 3.9s
- [ ] Total Blocking Time (TBT): < 300ms
- [ ] Cumulative Layout Shift (CLS): < 0.1

---

## 🌐 Cross-Browser Testing

### Chrome (Latest)
- [ ] Homepage loads correctly
- [ ] Lazy routes load correctly
- [ ] Confetti loads on click
- [ ] No console errors

### Firefox (Latest)
- [ ] Homepage loads correctly
- [ ] Lazy routes load correctly
- [ ] Confetti loads on click
- [ ] No console errors

### Safari (Latest)
- [ ] Homepage loads correctly
- [ ] Lazy routes load correctly
- [ ] Confetti loads on click
- [ ] No console errors

### Edge (Latest)
- [ ] Homepage loads correctly
- [ ] Lazy routes load correctly
- [ ] Confetti loads on click
- [ ] No console errors

---

## 📱 Mobile Testing

### iOS Safari
- [ ] Homepage loads quickly
- [ ] Touch interactions work
- [ ] Lazy loading works on scroll
- [ ] No layout shifts

### Android Chrome
- [ ] Homepage loads quickly
- [ ] Touch interactions work
- [ ] Lazy loading works on scroll
- [ ] No layout shifts

---

## ⚡ Performance Budget

Ensure bundle sizes stay within limits:

| Asset | Size Limit | Current | Status |
|-------|-----------|---------|--------|
| Main JS Bundle | < 50 kB | 36.17 kB | ✅ |
| React Vendor | < 220 kB | 206.31 kB | ✅ |
| CSS Bundle | < 70 kB | 61.93 kB | ✅ |
| RSVP Route | < 10 kB | 8.18 kB | ✅ |
| Slideshow Route | < 6 kB | 4.34 kB | ✅ |
| Stay Route | < 5 kB | 3.28 kB | ✅ |

---

## 🐛 Error Handling

### Test Lazy Loading Failures
- [ ] Simulate slow network in DevTools
- [ ] Verify loading states appear
- [ ] Verify fallback UI shows during loading
- [ ] No white screens or crashes

### Test API Failures
- [ ] Block `/.netlify/functions/*` in Network tab
- [ ] Verify error handling works
- [ ] User sees appropriate error messages

---

## 📝 Production Deployment

Before deploying to production:

- [ ] Run full test suite (`npm test` if available)
- [ ] Run production build (`npm run build`)
- [ ] Preview production build locally (`npm run preview`)
- [ ] Test all critical user flows
- [ ] Run Lighthouse on production build
- [ ] Verify all lazy chunks load correctly
- [ ] Check browser console for errors

---

## 🎯 Success Criteria

All of the following must be true:

- ✅ Initial bundle size < 50 kB (gzipped)
- ✅ All routes lazy load successfully
- ✅ Confetti loads on interaction only
- ✅ No console errors or warnings
- ✅ Lighthouse Performance score 90+ (desktop)
- ✅ All routes cached properly
- ✅ Preconnect improves API timing

---

**Last Updated:** October 12, 2025

