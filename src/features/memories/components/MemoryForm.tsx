import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fireConfetti } from "@lib/utils/confetti";

export default function MemoryForm() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("submitted") === "true") {
      fireConfetti();
    }
  }, [searchParams]);

  return (
    <div>
      <h3 className="font-display text-xl sm:text-2xl text-primary text-center mb-3 sm:mb-4 leading-tight">Share a Favorite Stacy Memory</h3>
      <p className="mt-2 text-xs sm:text-sm text-text-dark/80 font-body text-center mb-4 sm:mb-6 leading-relaxed">
        Everything posted here appears on the site and in our weekend slideshow.
      </p>

      <form 
        className="space-y-3 sm:space-y-4 text-left" 
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
          <label htmlFor="memory-name" className="block text-xs sm:text-sm font-semibold text-text-dark font-body">
            Your Name<span className="text-red-600">*</span>
          </label>
          <input 
            id="memory-name"
            name="name" 
            required 
            className="mt-1 w-full rounded-xl border border-secondary/20 p-2.5 sm:p-3 text-sm sm:text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-transparent font-body" 
            placeholder="Your name"
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="memory-message" className="block text-xs sm:text-sm font-semibold text-text-dark font-body">
            Your Memory<span className="text-red-600">*</span>
          </label>
          <textarea 
            id="memory-message"
            name="message" 
            required
            className="mt-1 w-full rounded-xl border border-secondary/20 p-2.5 sm:p-3 text-sm sm:text-base focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-transparent font-body leading-relaxed" 
            rows={5} 
            placeholder="Share your favorite memory with Stacy..."
            aria-required="true"
          />
          <p className="text-[10px] sm:text-xs text-text-dark/70 mt-1 font-body leading-relaxed">Share the details - the funnier, the better!</p>
        </div>

        <div>
          <label htmlFor="memory-photo" className="block text-xs sm:text-sm font-semibold text-text-dark font-body">
            Photo (encouraged!)
          </label>
          <input 
            id="memory-photo"
            name="photo" 
            type="file" 
            accept="image/*" 
            className="mt-1 w-full rounded-xl border border-secondary/20 p-2.5 sm:p-3 text-xs sm:text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition bg-transparent font-body"
          />
          <p className="text-[10px] sm:text-xs text-text-dark/70 mt-1 font-body leading-relaxed">Upload a photo to go with your memory</p>
        </div>

        <button type="submit" className="btn w-full text-sm sm:text-base">Share Memory</button>
      </form>
    </div>
  );
}

