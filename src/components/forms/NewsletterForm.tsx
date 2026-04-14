import { useState } from 'react';
import type { FormEvent } from 'react';
import { validateNewsletterForm, hasNewsletterErrors, type NewsletterFormData, type NewsletterErrors } from '@/utils/newsletterValidation';

export default function NewsletterForm() {
  const [formData, setFormData] = useState<NewsletterFormData>({ email: '', consent: false });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<NewsletterErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, consent: e.target.checked }));
    if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;

    const validationErrors = validateNewsletterForm(formData);
    if (hasNewsletterErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Subscription failed');

      setStatus('success');
      setSubmitMessage('Skontrolujte svoj email a potvrďte prihlásenie na odber.');
      setFormData({ email: '', consent: false });

      setTimeout(() => {
        setStatus('idle');
        setSubmitMessage('');
      }, 7000);
    } catch (error) {
      setStatus('error');
      setSubmitMessage('Nastala chyba pri prihlasovaní. Skúste to prosím neskôr.');
      console.error('Newsletter subscription error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot — hidden from humans, traps bots */}
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

      {/* Email */}
      <div>
        <label htmlFor="newsletter-email" className="block text-sm font-medium mb-2">
          Emailová adresa
        </label>
        <input
          type="email"
          id="newsletter-email"
          name="email"
          value={formData.email}
          onChange={handleEmailChange}
          aria-required="true"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
          className={`w-full px-4 py-2 rounded-md border ${errors.email ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
          placeholder="vas@email.sk"
          autoComplete="email"
          maxLength={254}
          disabled={status === 'loading'}
        />
        {errors.email && (
          <p id="newsletter-email-error" className="text-sm text-destructive mt-1">{errors.email}</p>
        )}
      </div>

      {/* GDPR Consent */}
      <div>
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="newsletter-consent"
            name="consent"
            checked={formData.consent}
            onChange={handleConsentChange}
            aria-required="true"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'newsletter-consent-error' : undefined}
            className={`mt-1 h-4 w-4 rounded border ${errors.consent ? 'border-destructive' : 'border-input'} bg-background focus:ring-2 focus:ring-ring`}
            disabled={status === 'loading'}
          />
          <label htmlFor="newsletter-consent" className="text-sm text-muted-foreground">
            Súhlasím so spracovaním osobných údajov za účelom zasielania noviniek.{' '}
            <a href="/ochrana-udajov" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Zásady ochrany osobných údajov
            </a>
          </label>
        </div>
        {errors.consent && (
          <p id="newsletter-consent-error" className="text-sm text-destructive mt-1">{errors.consent}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Prihlasovanie...' : 'Prihlásiť sa na odber'}
      </button>

      {/* Live region — announced by screen readers when status changes */}
      <div aria-live="polite" aria-atomic="true">
        {status === 'success' && (
          <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20" role="status">
            <p className="text-sm text-green-700 dark:text-green-400 font-medium">✓ {submitMessage}</p>
          </div>
        )}
        {status === 'error' && (
          <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20" role="alert">
            <p className="text-sm text-destructive">{submitMessage}</p>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Odoslaním formulára súhlasíte s našimi{' '}
        <a href="/ochrana-udajov" className="text-primary hover:underline">
          zásadami ochrany osobných údajov
        </a>
        . Odber môžete kedykoľvek zrušiť.
      </p>
    </form>
  );
}
