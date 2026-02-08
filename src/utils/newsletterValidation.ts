// Newsletter form validation utilities

/**
 * Validate email format (same as form validation)
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate GDPR consent (must be true)
 */
export function validateConsent(consent: boolean): boolean {
  return consent === true;
}

/**
 * Newsletter form error types
 */
export interface NewsletterErrors {
  email?: string;
  consent?: string;
}

/**
 * Newsletter form data interface
 */
export interface NewsletterFormData {
  email: string;
  consent: boolean;
}

/**
 * Validate complete newsletter form
 * Returns object with error messages (empty object if valid)
 */
export function validateNewsletterForm(data: NewsletterFormData): NewsletterErrors {
  const errors: NewsletterErrors = {};

  // Email validation
  if (!data.email) {
    errors.email = 'Email je povinný';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Neplatná emailová adresa';
  }

  // Consent validation (GDPR requirement)
  if (!validateConsent(data.consent)) {
    errors.consent = 'Musíte súhlasiť so spracovaním osobných údajov';
  }

  return errors;
}

/**
 * Check if form has any errors
 */
export function hasNewsletterErrors(errors: NewsletterErrors): boolean {
  return Object.keys(errors).length > 0;
}
