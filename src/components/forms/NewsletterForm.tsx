import { useState, useEffect, type FormEvent } from 'react';
import { validateNewsletterForm, hasNewsletterErrors, type NewsletterFormData, type NewsletterErrors } from '@/utils/newsletterValidation';

export default function NewsletterForm() {
  // Prevent scroll on focus/blur within newsletter form
  useEffect(() => {
    const preventScroll = (e: FocusEvent) => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      // Restore scroll position after focus event
      requestAnimationFrame(() => {
        window.scrollTo(scrollX, scrollY);
      });
    };

    const newsletterSection = document.getElementById('newsletter');
    if (newsletterSection) {
      // Add listeners to all focusable elements in newsletter section
      const focusableElements = newsletterSection.querySelectorAll('input, textarea, button, a, select');
      focusableElements.forEach(el => {
        el.addEventListener('focus', preventScroll);
        el.addEventListener('blur', preventScroll);
      });

      return () => {
        focusableElements.forEach(el => {
          el.removeEventListener('focus', preventScroll);
          el.removeEventListener('blur', preventScroll);
        });
      };
    }
  }, []);
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: '',
    consent: false,
  });

  const [errors, setErrors] = useState<NewsletterErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      email: e.target.value,
    }));

    // Clear email error when user starts typing
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      consent: e.target.checked,
    }));

    // Clear consent error when user checks the box
    if (errors.consent) {
      setErrors(prev => ({ ...prev, consent: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateNewsletterForm(formData);
    if (hasNewsletterErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    // Submit form
    setStatus('loading');
    setErrors({});

    try {
      // TODO: Replace with actual MailerLite API call when .env is configured
      // For now, mock the submission
      await mockNewsletterSubscription(formData);

      setStatus('success');
      setSubmitMessage('Skontrolujte svoj email a potvrďte prihlásenie na odber.');

      // Reset form
      setFormData({
        email: '',
        consent: false,
      });

      // Reset success message after 7 seconds
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Field */}
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
          className={`w-full px-4 py-2 rounded-md border ${
            errors.email ? 'border-destructive' : 'border-input'
          } bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
          placeholder="vas@email.sk"
          disabled={status === 'loading'}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email}</p>
        )}
      </div>

      {/* GDPR Consent Checkbox */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="newsletter-consent"
          name="consent"
          checked={formData.consent}
          onChange={handleConsentChange}
          className={`mt-1 h-4 w-4 rounded border ${
            errors.consent ? 'border-destructive' : 'border-input'
          } bg-background focus:ring-2 focus:ring-ring`}
          disabled={status === 'loading'}
        />
        <label htmlFor="newsletter-consent" className="text-sm text-muted-foreground">
          Súhlasím so spracovaním osobných údajov za účelom zasielania noviniek.{' '}
          <a
            href="/ochrana-udajov"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zásady ochrany osobných údajov
          </a>
        </label>
      </div>
      {errors.consent && (
        <p className="text-sm text-destructive">{errors.consent}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Prihlasovanie...' : 'Prihlásiť sa na odber'}
      </button>

      {/* Success Message */}
      {status === 'success' && (
        <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20">
          <p className="text-sm text-green-700 dark:text-green-400 font-medium">
            ✓ {submitMessage}
          </p>
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{submitMessage}</p>
        </div>
      )}

      {/* Info Note */}
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

/**
 * Mock newsletter subscription (temporary until MailerLite is configured)
 * TODO: Replace with actual MailerLite API call
 */
async function mockNewsletterSubscription(data: NewsletterFormData): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Log subscription (for testing)
  console.log('Newsletter subscription (MOCK):', data);

  // In production, this will be:
  // const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-MailerLite-ApiKey': import.meta.env.PUBLIC_MAILERLITE_KEY,
  //   },
  //   body: JSON.stringify({
  //     email: data.email,
  //     fields: {
  //       consent: data.consent,
  //       source: 'Website footer',
  //       signup_date: new Date().toISOString().split('T')[0],
  //     },
  //     type: 'unconfirmed', // Require double opt-in
  //     autoresponders: true, // Send welcome email
  //   }),
  // });
}
