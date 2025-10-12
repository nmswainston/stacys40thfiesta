import { ROUTES } from "@/constants";
import type { FormErrors, FormTouched } from "@/types";
import site from "@data/siteData";
import { fireConfetti } from "@lib/utils/confetti";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function RSVP(){
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const z = site.rsvp;

  useEffect(() => {
    if (searchParams.get("submitted") === "true") {
      setIsSubmitted(true);
      fireConfetti();
    }
  }, [searchParams]);

  const validateField = (name: string, value: string) => {
    switch(name) {
      case 'name':
        return value.trim().length < 2 ? 'Please enter your name.' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please use a valid email.' : '';
      case 'phone':
        return value.trim().length < 10 ? 'Please enter a valid phone number.' : '';
      case 'partySize':
        return !value || Number(value) < 1 ? 'Please enter number of guests.' : '';
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Form submission is handled by Netlify, but we can show a success message
    // Note: This won't actually prevent the form from submitting
  };

  const closeSuccessMessage = () => {
    setIsSubmitted(false);
    setSearchParams({});
  };

  // Success overlay
  if (isSubmitted) {
    return (
      <section className="bg-western-overlay py-8 sm:py-12 md:py-14 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="card-base p-6 sm:p-8 md:p-10">
            <div className="text-5xl sm:text-6xl mb-4" role="img" aria-label="party popper">🎉</div>
            <h1 className="text-western-display text-2xl sm:text-3xl md:text-4xl text-ink leading-tight">Thanks for Ponying Up!</h1>
            <p className="opacity-80 mt-3 sm:mt-4 text-base sm:text-lg text-ink leading-relaxed">
              We've received your RSVP! Don't forget to send your deposit via Zelle to secure your spot.
            </p>
            <div className="mt-6 sm:mt-8 flex gap-3 sm:gap-4 justify-center flex-wrap">
              <Link to={ROUTES.HOME} className="btn text-sm sm:text-base">
                Back to Home
              </Link>
              <Link to={ROUTES.AGENDA} className="btn text-sm sm:text-base">
                View Agenda
              </Link>
              <button onClick={closeSuccessMessage} className="btn bg-brand-100 text-brand-700 hover:bg-brand-200 text-sm sm:text-base">
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-western-overlay py-8 sm:py-12 md:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-western-display text-2xl sm:text-3xl md:text-4xl text-ink leading-tight">{z.heading}</h1>
          <div className="rule-ornate mt-3 sm:mt-4 mx-auto" />
          <p className="mt-4 sm:mt-6 text-brand-700 font-semibold text-sm sm:text-base leading-relaxed max-w-xl mx-auto">{z.depositNote}</p>
        </div>

        <div className="card-base max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-ink mb-3 sm:mb-4">{z.howItWorks.heading}</h2>
          <ol className="space-y-2.5 sm:space-y-3 list-decimal list-inside text-sm sm:text-base">
            {z.howItWorks.steps.map((step, i) => (
              <li key={i} className="text-ink leading-relaxed break-words"><strong>{step.title}</strong> — {step.description}</li>
            ))}
          </ol>
        </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
        <form 
          className="card-base space-y-3 sm:space-y-4" 
          name="rsvp" 
          method="POST" 
          data-netlify="true" 
          action="/rsvp?submitted=true" 
          data-netlify-honeypot="_catch"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="rsvp" autoComplete="off" />
          <p className="hidden" aria-hidden="true">
            <label>Don't fill this out: <input name="_catch" tabIndex={-1} autoComplete="off" /></label>
          </p>
          
          <div>
            <label htmlFor="rsvp-name" className="block text-xs sm:text-sm font-semibold text-ink">
              {z.form.labels.name}<span className="text-red-600"></span>
            </label>
            <input 
              id="rsvp-name"
              name="name" 
              required 
              autoComplete="name"
              className="mt-1 w-full rounded-xl border border-brand-200 p-2.5 sm:p-3 text-sm sm:text-base focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 transition" 
              placeholder={z.form.placeholders.name}
              aria-required="true"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.name && errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="rsvp-email" className="block text-xs sm:text-sm font-semibold text-ink">
              {z.form.labels.email}<span className="text-red-600"></span>
            </label>
            <input 
              id="rsvp-email"
              name="email" 
              type="email" 
              required 
              autoComplete="email"
              className="mt-1 w-full rounded-xl border border-brand-200 p-2.5 sm:p-3 text-sm sm:text-base focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 transition" 
              placeholder={z.form.placeholders.email}
              aria-required="true"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.email && errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="rsvp-phone" className="block text-xs sm:text-sm font-semibold text-ink">
              {z.form.labels.phone}<span className="text-red-600">*</span>
            </label>
            <input 
              id="rsvp-phone"
              name="phone" 
              type="tel" 
              required 
              autoComplete="tel"
              className="mt-1 w-full rounded-xl border border-brand-200 p-2.5 sm:p-3 text-sm sm:text-base focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 transition" 
              placeholder={z.form.placeholders.phone}
              aria-required="true"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.phone && errors.phone && (
              <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="rsvp-party-size" className="block text-xs sm:text-sm font-semibold text-ink">
              {z.form.labels.partySize}<span className="text-red-600"></span>
            </label>
            <input 
              id="rsvp-party-size"
              name="partySize" 
              type="number" 
              min="1" 
              required
              autoComplete="off"
              className="mt-1 w-full rounded-xl border border-brand-200 p-2.5 sm:p-3 text-sm sm:text-base focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 transition" 
              defaultValue={1}
              aria-required="true"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.partySize && errors.partySize && (
              <p className="text-xs text-red-600 mt-1">{errors.partySize}</p>
            )}
          </div>

          <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-brand-200">
            <button type="submit" className="btn w-full text-sm sm:text-base">
              {z.form.submitButton}
            </button>
          </div>
        </form>

        <aside className="space-y-3 sm:space-y-4">
          <div className="card-base border-2 border-brand-300">
            <h3 className="text-lg sm:text-xl font-extrabold text-ink mb-3 sm:mb-4">{z.zelleBlock.heading}</h3>
            <div className="bg-brand-50 border border-brand-200 rounded-lg p-3 sm:p-5">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm text-brand-700 font-medium">Handle:</span>
                  <span className="text-xs sm:text-sm font-semibold text-ink break-words text-right">{z.zelleBlock.handle}</span>
                </div>
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm text-brand-700 font-medium">Memo:</span>
                  <span className="text-xs sm:text-sm font-semibold text-ink break-words text-right">{z.zelleBlock.memo}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
            </div>
          </div>

          <div className="card-base">
            <h3 className="text-lg sm:text-xl font-extrabold text-ink">{z.questions.heading}</h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed">{z.questions.text}</p>
          </div>
        </aside>
      </div>

      <div className="card-base max-w-2xl mx-auto mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-extrabold text-ink mb-3 sm:mb-4">{z.whatHappensAfter.heading}</h2>
        <ul className="space-y-2 sm:space-y-2.5">
          {z.whatHappensAfter.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-brand-600 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
              <span className="text-ink text-sm sm:text-base leading-relaxed break-words"><strong>{item.title}</strong> — {item.description}</span>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
}
