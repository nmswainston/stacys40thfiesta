import { NetlifyForm } from "@components/integrations";
import { Button, Input } from "@components/ui";
import site from "@data/siteData";
import { postNetlifyForm } from "@lib/api/netlify";
import { fireConfetti } from "@lib/utils/confetti";
import React, { useState } from "react";
import { validateCarpoolForm } from "../helpers";

interface FormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  seats: string;
  location: string;
  notes: string;
}

export default function CarpoolForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    role: "",
    seats: "",
    location: "",
    notes: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const validationErrors = validateCarpoolForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await postNetlifyForm("carpool", e.target as HTMLFormElement);
      fireConfetti();
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        seats: "",
        location: "",
        notes: ""
      });
      
      // Show success message
      alert("Thanks for signing up! Your info is now on the Carpool Board. Check it out to coordinate rides with others!");
      
      // Scroll to top of carpool section
      setTimeout(() => {
        const carpoolSection = document.getElementById("carpool");
        if (carpoolSection) {
          carpoolSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const c = site.carpool.form;

  return (
    <NetlifyForm name="carpool" onSubmit={handleSubmit} className="space-y-4">
      <Input
        label={c.labels.fullName}
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        placeholder={c.placeholders.name}
      />

      <Input
        label={c.labels.email}
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        placeholder={c.placeholders.email}
      />

      <Input
        label={c.labels.phone}
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        required
        placeholder={c.placeholders.phone}
      />

      <fieldset className="space-y-2">
        <legend className="block text-xs sm:text-sm font-semibold text-ink">{c.labels.role}</legend>
        <div className="flex gap-3 sm:gap-4 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="driver"
              checked={formData.role === "driver"}
              onChange={handleChange}
              autoComplete="off"
              className="w-4 h-4 text-brand-600 border-brand-300 focus:ring-accent flex-shrink-0"
            />
            <span className="font-spanish-body text-sm sm:text-base">{c.roleOptions.driver}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="rider"
              checked={formData.role === "rider"}
              onChange={handleChange}
              autoComplete="off"
              className="w-4 h-4 text-brand-600 border-brand-300 focus:ring-accent flex-shrink-0"
            />
            <span className="font-spanish-body text-sm sm:text-base">{c.roleOptions.rider}</span>
          </label>
        </div>
        {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role}</p>}
      </fieldset>

      {formData.role === "driver" && (
        <Input
          label={c.labels.availableSeats}
          name="seats"
          type="number"
          min="1"
          value={formData.seats}
          onChange={handleChange}
          error={errors.seats}
          required
        />
      )}

      <Input
        label={c.labels.location}
        name="location"
        value={formData.location}
        onChange={handleChange}
        error={errors.location}
        placeholder={c.placeholders.location}
        required
      />

      <div className="space-y-1">
        <label htmlFor="carpool-notes" className="block text-xs sm:text-sm font-semibold text-ink">{c.labels.notes}</label>
        <textarea
          id="carpool-notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          autoComplete="off"
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-brand-200 rounded-xl focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-accent/30 transition-colors font-spanish-body bg-cream-50 text-sm sm:text-base leading-relaxed"
          rows={3}
          placeholder={c.placeholders.notes}
        />
      </div>

      {errors.submit && (
        <p className="text-xs sm:text-sm text-red-600 text-center leading-relaxed">{errors.submit}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full text-sm sm:text-base">
        {isSubmitting ? c.submittingButton : c.submitButton}
      </Button>
    </NetlifyForm>
  );
}

