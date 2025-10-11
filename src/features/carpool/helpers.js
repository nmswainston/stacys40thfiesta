/**
 * Validate carpool form data
 * @param {Object} data - Form data
 * @returns {Object} Validation errors (empty if valid)
 */
export function validateCarpoolForm(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please use a valid email.";
  }

  if (!data.phone || data.phone.trim().length < 10) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!data.role || !["driver", "rider"].includes(data.role)) {
    errors.role = "Please select driver or rider";
  }

  if (data.role === "driver") {
    if (!data.seats || parseInt(data.seats) < 1) {
      errors.seats = "Number of available seats is required";
    }
  }

  if (!data.location || data.location.trim().length < 3) {
    errors.location = "Departure location is required";
  }

  return errors;
}

/**
 * Format carpool data for submission
 * @param {Object} data - Raw form data
 * @returns {Object} Formatted data
 */
export function formatCarpoolData(data) {
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    role: data.role,
    seats: data.role === "driver" ? parseInt(data.seats) : 0,
    location: data.location.trim(),
    notes: data.notes?.trim() || "",
    timestamp: new Date().toISOString()
  };
}

