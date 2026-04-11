import { useState } from 'react';
import {
  validateContactForm,
  hasFormErrors,
  type ContactFormData,
  type FormErrors,
} from '@/utils/formValidation';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseFormSubmitOptions {
  /** Fields to merge into the Web3Forms payload alongside access_key */
  buildPayload: (data: ContactFormData) => Record<string, unknown>;
  successMessage: string | ((data: ContactFormData) => string);
  errorMessage?: string;
  successTimeout?: number;
  /** Override validation — defaults to validateContactForm */
  validate?: (data: ContactFormData) => FormErrors;
}

export function useFormSubmit({
  buildPayload,
  successMessage,
  errorMessage = 'Nastala chyba pri odosielaní. Skúste to prosím neskôr alebo nás kontaktujte telefonicky.',
  successTimeout = 5000,
  validate = validateContactForm,
}: UseFormSubmitOptions) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot — bots fill hidden fields, humans don't
    if (honeypot) return;

    const validationErrors = validate(formData);
    if (hasFormErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.PUBLIC_WEB3FORMS_KEY,
          ...buildPayload(formData),
        }),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Submission failed');

      setStatus('success');
      setSubmitMessage(
        typeof successMessage === 'function' ? successMessage(formData) : successMessage
      );
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => {
        setStatus('idle');
        setSubmitMessage('');
      }, successTimeout);
    } catch (error) {
      setStatus('error');
      setSubmitMessage(errorMessage);
      console.error('Form submission error:', error);
    }
  };

  return { formData, honeypot, setHoneypot, errors, status, submitMessage, handleChange, handleSubmit };
}
