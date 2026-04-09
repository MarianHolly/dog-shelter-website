import { useState, type FormEvent } from 'react';
import { validateContactForm, hasFormErrors, type ContactFormData, type FormErrors } from '@/utils/formValidation';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check — bots fill hidden fields, humans don't
    if (honeypot) return;

    // Validate form
    const validationErrors = validateContactForm(formData);
    if (hasFormErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    // Submit form
    setStatus('loading');
    setErrors({});

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.PUBLIC_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          message: formData.message,
          subject: 'Kontakt z webstránky',
          from_name: 'Trenčianský útulok - Kontaktný formulár',
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Submission failed');
      }

      setStatus('success');
      setSubmitMessage('Správa bola úspešne odoslaná. Ozveme sa vám čoskoro!');

      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => {
        setStatus('idle');
        setSubmitMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setSubmitMessage('Nastala chyba pri odosielaní správy. Skúste to prosím neskôr alebo nás kontaktujte telefonicky.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field — hidden from humans, traps bots */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
      />

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Meno a priezvisko <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-md border ${
            errors.name ? 'border-destructive' : 'border-input'
          } bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
          placeholder="Ján Novák"
          autoComplete="name"
          maxLength={100}
          disabled={status === 'loading'}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-destructive">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-md border ${
            errors.email ? 'border-destructive' : 'border-input'
          } bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
          placeholder="jan.novak@email.sk"
          autoComplete="email"
          maxLength={254}
          disabled={status === 'loading'}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone Field (Optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Telefón <span className="text-muted-foreground text-xs">(voliteľné)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-md border ${
            errors.phone ? 'border-destructive' : 'border-input'
          } bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
          placeholder="+421 915 785 007"
          autoComplete="tel"
          maxLength={20}
          disabled={status === 'loading'}
        />
        {errors.phone && (
          <p className="text-sm text-destructive mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Správa <span className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-2 rounded-md border ${
            errors.message ? 'border-destructive' : 'border-input'
          } bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y`}
          placeholder="Mám záujem o adopciu psíka..."
          autoComplete="off"
          maxLength={2000}
          disabled={status === 'loading'}
        />
        {errors.message && (
          <p className="text-sm text-destructive mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Odosielam...' : 'Odoslať správu'}
      </button>

      {/* Success Message */}
      {status === 'success' && (
        <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20">
          <p className="text-sm text-green-700 dark:text-green-400">{submitMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{submitMessage}</p>
        </div>
      )}

      {/* Required Fields Note */}
      <p className="text-xs text-muted-foreground">
        <span className="text-destructive">*</span> Povinné polia
      </p>
    </form>
  );
}

