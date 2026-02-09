import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validateConsent,
  validateNewsletterForm,
  hasNewsletterErrors,
} from './newsletterValidation';

describe('newsletterValidation', () => {
  describe('validateEmail', () => {
    it('should accept valid email addresses', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('newsletter@dog-shelter.sk')).toBe(true);
      expect(validateEmail('test+tag@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('user @example.com')).toBe(false);
    });

    it('should reject empty string', () => {
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateConsent', () => {
    it('should accept true value', () => {
      expect(validateConsent(true)).toBe(true);
    });

    it('should reject false value', () => {
      expect(validateConsent(false)).toBe(false);
    });

    it('should be strict about boolean type', () => {
      // These should technically fail in strict mode, but JS is lenient
      expect(validateConsent(1 as any)).toBe(false);
      expect(validateConsent(0 as any)).toBe(false);
      expect(validateConsent('true' as any)).toBe(false);
    });
  });

  describe('validateNewsletterForm', () => {
    it('should return empty object for valid form data', () => {
      const data = {
        email: 'user@example.com',
        consent: true,
      };
      expect(validateNewsletterForm(data)).toEqual({});
    });

    it('should validate email field', () => {
      const data = {
        email: 'invalid-email',
        consent: true,
      };
      const errors = validateNewsletterForm(data);
      expect(errors.email).toBeDefined();
    });

    it('should require email field', () => {
      const data = {
        email: '',
        consent: true,
      };
      const errors = validateNewsletterForm(data);
      expect(errors.email).toBeDefined();
    });

    it('should validate consent field', () => {
      const data = {
        email: 'user@example.com',
        consent: false,
      };
      const errors = validateNewsletterForm(data);
      expect(errors.consent).toBeDefined();
    });

    it('should return multiple errors for completely invalid form', () => {
      const data = {
        email: 'invalid-email',
        consent: false,
      };
      const errors = validateNewsletterForm(data);
      expect(Object.keys(errors).length).toBeGreaterThan(1);
      expect(errors.email).toBeDefined();
      expect(errors.consent).toBeDefined();
    });

    it('should have error messages in Slovak language', () => {
      const data = {
        email: 'invalid',
        consent: false,
      };
      const errors = validateNewsletterForm(data);
      expect(errors.email).toContain('Neplatná');
      expect(errors.consent).toContain('súhlasiť');
    });
  });

  describe('hasNewsletterErrors', () => {
    it('should return true when errors object has properties', () => {
      expect(hasNewsletterErrors({ email: 'Invalid email' })).toBe(true);
      expect(hasNewsletterErrors({ consent: 'Consent required' })).toBe(true);
      expect(hasNewsletterErrors({ email: 'Invalid', consent: 'Required' })).toBe(true);
    });

    it('should return false for empty errors object', () => {
      expect(hasNewsletterErrors({})).toBe(false);
    });
  });
});
