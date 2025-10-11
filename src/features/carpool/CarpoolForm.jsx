import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import site from "../../data/siteData";
import NetlifyForm from "../../components/forms/NetlifyForm";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { validateCarpoolForm, formatCarpoolData } from "./helpers";
import { postNetlifyForm } from "../../lib/netlify";
import { fireConfetti } from "../../lib/confetti";

export default function CarpoolForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    seats: "",
    location: "",
    notes: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateCarpoolForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await postNetlifyForm("carpool", e.target);
      fireConfetti();
      setTimeout(() => {
        navigate("/carpool/thanks");
      }, 400);
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

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink">{c.labels.role}</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="driver"
              checked={formData.role === "driver"}
              onChange={handleChange}
              className="w-4 h-4 text-brand-600 border-brand-300 focus:ring-accent"
            />
            <span className="font-spanish-body">{c.roleOptions.driver}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="rider"
              checked={formData.role === "rider"}
              onChange={handleChange}
              className="w-4 h-4 text-brand-600 border-brand-300 focus:ring-accent"
            />
            <span className="font-spanish-body">{c.roleOptions.rider}</span>
          </label>
        </div>
        {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role}</p>}
      </div>

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
        <label className="block text-sm font-semibold text-ink">{c.labels.notes}</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-brand-200 rounded-xl focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-accent/30 transition-colors font-spanish-body bg-cream-50"
          rows="3"
          placeholder={c.placeholders.notes}
        />
      </div>

      {errors.submit && (
        <p className="text-sm text-red-600 text-center">{errors.submit}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? c.submittingButton : c.submitButton}
      </Button>
    </NetlifyForm>
  );
}

