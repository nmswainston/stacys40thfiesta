import React from "react";

interface NetlifyFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  name: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

/**
 * Minimal wrapper for Netlify Forms that handles the hidden form-name field
 * @param name - The name of the Netlify form
 * @param onSubmit - Submit handler
 * @param children - Form contents
 */
export default function NetlifyForm({ name, onSubmit, children, ...props }: NetlifyFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form name={name} onSubmit={handleSubmit} data-netlify="true" {...props}>
      <input type="hidden" name="form-name" value={name} />
      {children}
    </form>
  );
}

