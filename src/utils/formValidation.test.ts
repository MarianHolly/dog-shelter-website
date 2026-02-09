import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePhone,
  validateName,
  validateMessage,
  validateContactForm,
  hasFormErrors,
} from './formValidation';

describe('formValidation', () => {
  describe('validateEmail', () => {
    it('should accept valid email addresses', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.email+tag@domain.co.uk')).toBe(true);
      expect(validateEmail('info@dog-shelter.sk')).toBe(true);
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

  describe('validatePhone', () => {
    it('should accept valid Slovak phone numbers with +421 prefix', () => {
      expect(validatePhone('+421 123 456 789')).toBe(true);
      expect(validatePhone('+421123456789')).toBe(true);
      expect(validatePhone('+421 900 123 456')).toBe(true);
    });

    it('should accept valid Slovak phone numbers with 0 prefix', () => {
      expect(validatePhone('0123 456 789')).toBe(true);
      expect(validatePhone('0123456789')).toBe(true);
      expect(validatePhone('0900 123 456')).toBe(true);
    });

    it('should reject invalid Slovak phone numbers', () => {
      expect(validatePhone('+420 123 456 789')).toBe(false); // Czech format
      expect(validatePhone('123 456 789')).toBe(false); // Missing prefix
      expect(validatePhone('+421 12 345 678')).toBe(false); // Too short
      expect(validatePhone('+421 1234567890')).toBe(false); // Too many digits
    });

    it('should reject non-numeric characters (except spaces and +)', () => {
      expect(validatePhone('+421 abc def ghi')).toBe(false);
      expect(validatePhone('0123-456-789')).toBe(false);
    });

    it('should reject empty string', () => {
      expect(validatePhone('')).toBe(false);
    });
  });

  describe('validateName', () => {
    it('should accept names with 2 or more characters', () => {
      expect(validateName('Jo')).toBe(true);
      expect(validateName('John')).toBe(true);
      expect(validateName('María')).toBe(true);
      expect(validateName('Jean-Pierre')).toBe(true);
    });

    it('should reject names with less than 2 characters', () => {
      expect(validateName('J')).toBe(false);
      expect(validateName('')).toBe(false);
    });

    it('should trim whitespace before validation', () => {
      expect(validateName('  Jo  ')).toBe(true);
      expect(validateName('  J  ')).toBe(false);
    });
  });

  describe('validateMessage', () => {
    it('should accept messages with 10 or more characters', () => {
      expect(validateMessage('Hello world')).toBe(true);
      expect(validateMessage('This is a test message')).toBe(true);
      expect(validateMessage('1234567890')).toBe(true);
    });

    it('should reject messages with less than 10 characters', () => {
      expect(validateMessage('Short')).toBe(false);
      expect(validateMessage('123456789')).toBe(false);
      expect(validateMessage('')).toBe(false);
    });

    it('should trim whitespace before validation', () => {
      expect(validateMessage('  Hello world  ')).toBe(true);
      expect(validateMessage('  Short  ')).toBe(false);
    });
  });

  describe('validateContactForm', () => {
    it('should return empty object for valid form data', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+421 123 456 789',
        message: 'This is a test message',
      };
      expect(validateContactForm(data)).toEqual({});
    });

    it('should validate name field', () => {
      const data = {
        name: 'J',
        email: 'john@example.com',
        message: 'This is a test message',
      };
      const errors = validateContactForm(data);
      expect(errors.name).toBeDefined();
    });

    it('should validate email field', () => {
      const data = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'This is a test message',
      };
      const errors = validateContactForm(data);
      expect(errors.email).toBeDefined();
    });

    it('should validate message field', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short',
      };
      const errors = validateContactForm(data);
      expect(errors.message).toBeDefined();
    });

    it('should validate optional phone field when provided', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: 'invalid-phone',
        message: 'This is a test message',
      };
      const errors = validateContactForm(data);
      expect(errors.phone).toBeDefined();
    });

    it('should allow missing phone field', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message',
      };
      const errors = validateContactForm(data);
      expect(errors.phone).toBeUndefined();
    });

    it('should allow empty phone field', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '   ',
        message: 'This is a test message',
      };
      const errors = validateContactForm(data);
      expect(errors.phone).toBeUndefined();
    });

    it('should return multiple errors for completely invalid form', () => {
      const data = {
        name: 'J',
        email: 'invalid',
        phone: '123',
        message: 'Bad',
      };
      const errors = validateContactForm(data);
      expect(Object.keys(errors).length).toBeGreaterThan(1);
      expect(errors.name).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.phone).toBeDefined();
      expect(errors.message).toBeDefined();
    });
  });

  describe('hasFormErrors', () => {
    it('should return true when errors object has properties', () => {
      expect(hasFormErrors({ email: 'Invalid email' })).toBe(true);
      expect(hasFormErrors({ name: 'Too short', email: 'Invalid' })).toBe(true);
    });

    it('should return false for empty errors object', () => {
      expect(hasFormErrors({})).toBe(false);
    });
  });
});
