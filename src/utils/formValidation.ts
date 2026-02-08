// Form validation utilities for contact, adoption inquiry, and volunteer forms

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Slovak format)
 * Accepts: +421 XXX XXX XXX or 0XXX XXX XXX
 */
export function validatePhone(phone: string): boolean {
  // Remove all spaces for validation
  const cleanPhone = phone.replace(/\s/g, '');

  // Slovak phone format: +421XXXXXXXXX (12 chars) or 0XXXXXXXXX (10 chars)
  const phoneRegex = /^(\+421[0-9]{9}|0[0-9]{9})$/;
  return phoneRegex.test(cleanPhone);
}

/**
 * Validate name (minimum 2 characters)
 */
export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

/**
 * Validate message (minimum 10 characters)
 */
export function validateMessage(message: string): boolean {
  return message.trim().length >= 10;
}

/**
 * Form error types
 */
export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

/**
 * Contact form data interface
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Validate complete contact form
 * Returns object with error messages (empty object if valid)
 */
export function validateContactForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  // Name validation
  if (!data.name || !validateName(data.name)) {
    errors.name = 'Meno musí mať aspoň 2 znaky';
  }

  // Email validation
  if (!data.email) {
    errors.email = 'Email je povinný';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Neplatná emailová adresa';
  }

  // Phone validation (optional field)
  if (data.phone && data.phone.trim() !== '' && !validatePhone(data.phone)) {
    errors.phone = 'Neplatné telefónne číslo (formát: +421 XXX XXX XXX alebo 0XXX XXX XXX)';
  }

  // Message validation
  if (!data.message || !validateMessage(data.message)) {
    errors.message = 'Správa musí mať aspoň 10 znakov';
  }

  return errors;
}

/**
 * Check if form has any errors
 */
export function hasFormErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
