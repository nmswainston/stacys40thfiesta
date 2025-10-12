import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
  // Determine appropriate autocomplete value based on name/type if not provided
  const getAutocomplete = () => {
    if (props.autoComplete) return props.autoComplete;
    const name = props.name?.toLowerCase();
    if (!name) return 'off';
    
    if (name.includes('email')) return 'email';
    if (name.includes('phone') || props.type === 'tel') return 'tel';
    if (name === 'name') return 'name';
    if (name.includes('location') || name.includes('address')) return 'street-address';
    if (name.includes('seat')) return 'off';
    return 'off';
  };

  const { autoComplete: _, ...inputProps } = props;
  
  // Generate unique ID for label-input association
  const inputId = props.id || `input-${props.name}`;

  return (
    <div className="space-y-1">
      {label && <label htmlFor={inputId} className="block text-xs sm:text-sm font-semibold text-ink">{label}</label>}
      <input 
        id={inputId}
        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-brand-200 rounded-xl focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-accent/30 transition-colors bg-cream-50 text-sm sm:text-base ${className}`}
        {...inputProps}
        autoComplete={getAutocomplete()}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

