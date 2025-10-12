import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({ 
  plugins: [react()],
  server: {
    allowedHosts: [
      'devserver-main--stacys40thfiesta.netlify.app',
      '.netlify.app', // Allow all Netlify subdomains
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@app": path.resolve(__dirname, "./src/app"),
    }
  },
  build: {
    // Improve chunking for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Confetti only loads on interaction, separate chunk
          'confetti': ['canvas-confetti'],
        },
      },
    },
    // Enable source maps for debugging (can disable in production if needed)
    sourcemap: false,
    // Increase chunk size warning limit to 1000kb (reasonable for modern web)
    chunkSizeWarningLimit: 1000,
  },
});
