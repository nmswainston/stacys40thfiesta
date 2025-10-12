import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-xs sm:text-sm font-semibold text-ink">{label}</label>}
      <input 
        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-brand-200 rounded-xl focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-accent/30 transition-colors bg-cream-50 text-sm sm:text-base ${className}`}
        {...props} 
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

