import React from "react";

/**
 * Minimal wrapper for Netlify Forms that handles the hidden form-name field
 * @param {string} name - The name of the Netlify form
 * @param {function} onSubmit - Submit handler
 * @param {ReactNode} children - Form contents
 */
export default function NetlifyForm({ name, onSubmit, children, ...props }) {
  const handleSubmit = (e) => {
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

