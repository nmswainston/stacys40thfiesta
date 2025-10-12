import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fireConfetti } from "../lib/confetti";
import site from "../data/siteData";

export default function RSVP(){
  const [searchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const z = site.rsvp;

  useEffect(() => {
    if (searchParams.get("submitted") === "true") {
      setIsSubmitted(true);
      fireConfetti();
    }
  }, [searchParams]);

  const validateField = (name, value) => {
    switch(name) {
      case 'name':
        return value.trim().length < 2 ? 'Please enter your full name.' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please use a valid email.' : '';
      case 'phone':
        return value.trim().length < 10 ? 'Please enter a valid phone number.' : '';
      case 'partySize':
        return !value || value < 1 ? 'Please enter number of guests.' : '';
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleSubmit = (e) => {
    // Form submission is handled by Netlify, but we can show a success message
    // Note: This won't actually prevent the form from submitting
  };


  return (
    <section className="bg-western-overlay py-14">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-western-display text-4xl text-ink">{z.heading}</h1>
          <div className="rule-ornate mt-3 mx-auto" />
          <p className="mt-6 text-brand-700 font-semibold">{z.depositNote}</p>
        </div>

        <div className="card-base max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-extrabold text-ink mb-4">{z.howItWorks.heading}</h2>
          <ol className="space-y-3 list-decimal list-inside">
            {z.howItWorks.steps.map((step, i) => (
              <li key={i} className="text-ink"><strong>{step.title}</strong> — {step.description}</li>
            ))}
          </ol>
        </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <form 
          className="card-base space-y-4" 
          name="rsvp" 
          method="POST" 
          data-netlify="true" 
          action="/rsvp?submitted=true" 
          data-netlify-honeypot="_catch"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="rsvp" />
          <p className="hidden" aria-hidden="true">
            <label>Don't fill this out: <input name="_catch" tabIndex="-1" /></label>
          </p>
          
          <div>
            <label htmlFor="rsvp-name" className="block text-sm font-semibold text-ink">
              {z.form.labels.name}<span className="text-red-600"></span>
            </label>
            <input 
              id="rsvp-name"
              name="name" 
              required 
              className="mt-1 w-full rounded-xl border border-brand-200 p-3 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 transition" 
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
            <label htmlFor="rsvp-email" className="block text-sm font-semibold text-ink">
              {z.form.labels.email}<span className="text-red-600"></span>
            </label>
            <input 
              id="rsvp-email"
              name="email" 
              type="email" 
              required 
              className="mt-1 w-full rounded-xl border border-brand-200 p-3 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 transition" 
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
            <label htmlFor="rsvp-phone" className="block text-sm font-semibold text-ink">
              {z.form.labels.phone}<span className="text-red-600">*</span>
            </label>
            <input 
              id="rsvp-phone"
              name="phone" 
              type="tel" 
              required 
              className="mt-1 w-full rounded-xl border border-brand-200 p-3 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 transition" 
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
            <label htmlFor="rsvp-party-size" className="block text-sm font-semibold text-ink">
              {z.form.labels.partySize}<span className="text-red-600"></span>
            </label>
            <input 
              id="rsvp-party-size"
              name="partySize" 
              type="number" 
              min="1" 
              required
              className="mt-1 w-full rounded-xl border border-brand-200 p-3 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 transition" 
              defaultValue={1}
              aria-required="true"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.partySize && errors.partySize && (
              <p className="text-xs text-red-600 mt-1">{errors.partySize}</p>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-brand-200">
            <button type="submit" className="btn w-full">
              {z.form.submitButton}
            </button>
          </div>
        </form>

        <aside className="space-y-4">
          <div className="card-base border-2 border-brand-300">
            <h3 className="text-xl font-extrabold text-ink mb-4">{z.zelleBlock.heading}</h3>
            <div className="bg-brand-50 border border-brand-200 rounded-lg p-5">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-brand-700 font-medium">Name:</span>
                  <span className="text-sm font-semibold text-ink">{z.zelleBlock.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-brand-700 font-medium">Handle:</span>
                  <span className="text-sm font-semibold text-ink">{z.zelleBlock.handle}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-brand-700 font-medium">Memo:</span>
                  <span className="text-sm font-semibold text-ink">{z.zelleBlock.memo}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs text-brand-600/80 italic">{z.zelleBlock.refundPolicy}</p>
              <p className="text-xs text-brand-600 font-medium">{z.zelleBlock.confirmationNote}</p>
            </div>
          </div>

          <div className="card-base">
            <h3 className="text-xl font-extrabold text-ink">{z.questions.heading}</h3>
            <p className="mt-1 text-sm">{z.questions.text}</p>
          </div>
        </aside>
      </div>

      <div className="card-base max-w-2xl mx-auto mt-8">
        <h2 className="text-2xl font-extrabold text-ink mb-4">{z.whatHappensAfter.heading}</h2>
        <ul className="space-y-2">
          {z.whatHappensAfter.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-brand-600 mt-1">•</span>
              <span className="text-ink"><strong>{item.title}</strong> — {item.description}</span>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
}