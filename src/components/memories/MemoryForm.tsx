import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fireConfetti } from "../../lib/confetti";

export default function MemoryForm() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("submitted") === "true") {
      fireConfetti();
    }
  }, [searchParams]);

  return (
    <div>
      <h3 className="font-display text-2xl text-primary text-center mb-4">Share a Favorite Stacy Memory</h3>
      <p className="mt-2 text-sm text-text-dark/80 font-body text-center mb-6">
        Everything posted here appears on the site and in our weekend slideshow.
      </p>

      <form 
        className="space-y-4 text-left" 
        name="memories" 
        method="POST" 
        data-netlify="true" 
        data-netlify-honeypot="website" 
        encType="multipart/form-data"
        action="/memories?submitted=true"
      >
        <input type="hidden" name="form-name" value="memories" />
        
        {/* Honeypot field for spam prevention */}
        <input 
          type="text" 
          name="website" 
          style={{ display: 'none' }} 
          tabIndex={-1} 
          autoComplete="off"
          aria-hidden="true"
        />

        <div>
          <label htmlFor="memory-name" className="block text-sm font-semibold text-text-dark font-body">
            Your Name<span className="text-red-600">*</span>
          </label>
          <input 
            id="memory-name"
            name="name" 
            required 
            className="mt-1 w-full rounded-xl border border-secondary/20 p-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-transparent font-body" 
            placeholder="Your name"
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="memory-email" className="block text-sm font-semibold text-text-dark font-body">
            Email (optional)
          </label>
          <input 
            id="memory-email"
            name="email"
            type="email"
            className="mt-1 w-full rounded-xl border border-secondary/20 p-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-transparent font-body" 
            placeholder="your.email@example.com"
          />
          <p className="text-xs text-text-dark/70 mt-1 font-body">Never displayed publicly</p>
        </div>

        <div>
          <label htmlFor="memory-message" className="block text-sm font-semibold text-text-dark font-body">
            Your Memory<span className="text-red-600">*</span>
          </label>
          <textarea 
            id="memory-message"
            name="message" 
            required
            className="mt-1 w-full rounded-xl border border-secondary/20 p-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-transparent font-body" 
            rows={5} 
            placeholder="Share your favorite memory with Stacy..."
            aria-required="true"
          />
          <p className="text-xs text-text-dark/70 mt-1 font-body">Share the details - the funnier, the better!</p>
        </div>

        <div>
          <label htmlFor="memory-photo" className="block text-sm font-semibold text-text-dark font-body">
            Photo (optional)
          </label>
          <input 
            id="memory-photo"
            name="photo" 
            type="file" 
            accept="image/*" 
            className="mt-1 w-full rounded-xl border border-secondary/20 p-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-transparent font-body"
          />
          <p className="text-xs text-text-dark/70 mt-1 font-body">Upload a photo to go with your memory</p>
        </div>

        <button type="submit" className="btn w-full">Share Memory</button>
      </form>
    </div>
  );
}

