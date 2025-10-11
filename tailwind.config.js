/** @type {import('tailwindcss').Config} */
/**
 * Tailwind CSS v4 Configuration - Old Mexican Rodeo Theme
 * 
 * IMPORTANT: Tailwind v4 uses CSS-based configuration via @theme directive.
 * The traditional JavaScript theme.extend approach is NOT used in v4.
 * 
 * All theme customizations are defined in CSS files:
 * - src/styles/globals.css (primary @theme block)
 * - src/styles/tokens.css (legacy CSS custom properties)
 * 
 * This minimal JavaScript config is kept for v4 compatibility only.
 * Content paths are automatically detected from all source files.
 * 
 * ═══════════════════════════════════════════════════════════════
 * COLOR PALETTE (defined in globals.css @theme block)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Primary Colors:
 *   cream:       #F9F4E7  (249, 244, 231)  - Background
 *   dustyRed:    #C65A4A  (198, 90, 74)    - Primary
 *   ropeBrown:   #A07452  (160, 116, 82)   - Secondary
 *   dustyPink:   #E7A4A2  (231, 164, 162)  - Accent
 *   textDark:    #2E1C14  (46, 28, 20)     - Text
 *   textLight:   #FFFDF9  (255, 253, 249)  - Light Text
 * 
 * ═══════════════════════════════════════════════════════════════
 * TYPOGRAPHY (defined in globals.css @theme block)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Font Families:
 *   display:  Rye           - Vintage rodeo poster headlines
 *   body:     Urbanist      - Clean, modern, readable body text
 *   accent:   Rancho        - Handwritten western flair
 * 
 * Font Usage:
 *   font-display     - Headlines, titles, hero text
 *   font-body        - Paragraphs, descriptions, UI text
 *   font-accent      - Decorative elements, callouts
 *   font-western     - Alias for font-display (legacy)
 *   font-elegant     - Alias for font-accent (legacy)
 * 
 * Typography Best Practices:
 *   - Headings: uppercase, tracking-wide for rodeo poster feel
 *   - Body: normal case, line-height 1.7 for readability
 *   - Accent: use sparingly for special callouts
 * 
 * ═══════════════════════════════════════════════════════════════
 * 
 * Note: In Tailwind v4, configuration looks like:
 *   @theme {
 *     --color-cream: 249 244 231;
 *     --font-family-display: Rye, serif;
 *     ...
 *   }
 * 
 * NOT the v3 JavaScript approach:
 *   theme: {
 *     extend: {
 *       colors: { cream: '#F9F4E7' },
 *       fontFamily: { display: ['Rye', 'serif'] }
 *     }
 *   }
 */
export default {
  // Minimal config for Tailwind v4
  // All theme configuration is in src/styles/globals.css @theme block
};