import { useFormSubmit } from '@/hooks/useFormSubmit';
import { validateContactForm, type ContactFormData, type FormErrors } from '@/utils/formValidation';

interface AdoptionInquiryFormProps {
  dogName: string;
  dogSlug: string;
}

function validateAdoptionForm(data: ContactFormData): FormErrors {
  const errors = validateContactForm(data);
  // Phone is required for adoption — shelter needs to call to arrange a visit
  if (!data.phone || data.phone.trim() === '') {
    errors.phone = 'Telefón je povinný pre dohodnutie termínu návštevy';
  }
  return errors;
}

export default function AdoptionInquiryForm({ dogName, dogSlug }: AdoptionInquiryFormProps) {
  const { formData, honeypot, setHoneypot, errors, status, submitMessage, handleChange, handleSubmit } =
    useFormSubmit({
      validate: validateAdoptionForm,
      buildPayload: (data) => ({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        subject: `Záujem o adopciu - ${dogName}`,
        from_name: 'Trenčianský útulok - Adopcia',
        'Pes': dogName,
        'Profil psa': `https://utulok-trencin.sk/psici/${dogSlug}`,
      }),
      successMessage: `Ďakujeme za záujem o ${dogName}! Ozveme sa vám čoskoro s ďalšími informáciami o adopčnom procese.`,
      errorMessage: 'Nastala chyba pri odosielaní formulára. Skúste to prosím neskôr alebo nás kontaktujte telefonicky na +421 915 785 007.',
      successTimeout: 7000,
    });

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

      {/* Dog info */}
      <div className="p-4 rounded-md bg-primary/5 border border-primary/20">
        <p className="text-sm text-muted-foreground">
          Záujem o adopciu: <span className="font-semibold text-foreground">{dogName}</span>
        </p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="adoption-name" className="block text-sm font-medium mb-2">
          Meno a priezvisko <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="adoption-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'adoption-name-error' : undefined}
          className={`w-full px-4 py-2 rounded-md border ${errors.name ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
          placeholder="Ján Novák"
          autoComplete="name"
          maxLength={100}
          disabled={status === 'loading'}
        />
        {errors.name && (
          <p id="adoption-name-error" className="text-sm text-destructive mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="adoption-email" className="block text-sm font-medium mb-2">
          Email <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="adoption-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'adoption-email-error' : undefined}
          className={`w-full px-4 py-2 rounded-md border ${errors.email ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
          placeholder="jan.novak@email.sk"
          autoComplete="email"
          maxLength={254}
          disabled={status === 'loading'}
        />
        {errors.email && (
          <p id="adoption-email-error" className="text-sm text-destructive mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone (required for adoption) */}
      <div>
        <label htmlFor="adoption-phone" className="block text-sm font-medium mb-2">
          Telefón <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <input
          type="tel"
          id="adoption-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={`adoption-phone-hint${errors.phone ? ' adoption-phone-error' : ''}`}
          className={`w-full px-4 py-2 rounded-md border ${errors.phone ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
          placeholder="+421 915 785 007"
          autoComplete="tel"
          maxLength={20}
          disabled={status === 'loading'}
        />
        <p id="adoption-phone-hint" className="text-xs text-muted-foreground mt-1">
          Telefón je dôležitý pre dohodnutie termínu návštevy a adopcie.
        </p>
        {errors.phone && (
          <p id="adoption-phone-error" className="text-sm text-destructive mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="adoption-message" className="block text-sm font-medium mb-2">
          Správa <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <textarea
          id="adoption-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'adoption-message-error' : undefined}
          className={`w-full px-4 py-2 rounded-md border ${errors.message ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y`}
          placeholder={`Napíšte nám niečo o sebe, vašej rodine a prečo chcete adoptovať práve ${dogName}...`}
          autoComplete="off"
          maxLength={2000}
          disabled={status === 'loading'}
        />
        {errors.message && (
          <p id="adoption-message-error" className="text-sm text-destructive mt-1">{errors.message}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Pomôže nám to lepšie pochopiť, či je {dogName} vhodný pre vašu rodinu.
        </p>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Odosielam...' : 'Odoslať žiadosť o adopciu'}
      </button>

      {/* Live region — announced by screen readers when status changes */}
      <div aria-live="polite" aria-atomic="true">
        {status === 'success' && (
          <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20" role="status">
            <p className="text-sm text-green-700 dark:text-green-400">{submitMessage}</p>
          </div>
        )}
        {status === 'error' && (
          <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20" role="alert">
            <p className="text-sm text-destructive">{submitMessage}</p>
          </div>
        )}
      </div>

      <div className="p-4 rounded-md bg-muted/50 border border-border">
        <p className="text-xs text-muted-foreground">
          <strong>Čo sa stane ďalej?</strong> Po odoslaní formulára vás budeme kontaktovať do 48 hodín
          a dohodneme si termín návštevy útulku, kde si môžete {dogName} osobne spoznať a zistiť viac
          o adopčnom procese.
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        <span className="text-destructive" aria-hidden="true">*</span> Povinné polia
      </p>
    </form>
  );
}
