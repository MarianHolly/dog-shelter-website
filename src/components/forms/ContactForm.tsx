import { useFormSubmit } from '@/hooks/useFormSubmit';

export default function ContactForm() {
  const { formData, honeypot, setHoneypot, errors, status, submitMessage, handleChange, handleSubmit } =
    useFormSubmit({
      buildPayload: (data) => ({
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        message: data.message,
        subject: 'Kontakt z webstránky',
        from_name: 'Trenčianský útulok - Kontaktný formulár',
      }),
      successMessage: 'Správa bola úspešne odoslaná. Ozveme sa vám čoskoro!',
      errorMessage: 'Nastala chyba pri odosielaní správy. Skúste to prosím neskôr alebo nás kontaktujte telefonicky.',
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

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Meno a priezvisko <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={`w-full px-4 py-2 rounded-md border ${errors.name ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
          placeholder="Ján Novák"
          autoComplete="name"
          maxLength={100}
          disabled={status === 'loading'}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`w-full px-4 py-2 rounded-md border ${errors.email ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
          placeholder="jan.novak@email.sk"
          autoComplete="email"
          maxLength={254}
          disabled={status === 'loading'}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone (optional) */}
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
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          className={`w-full px-4 py-2 rounded-md border ${errors.phone ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
          placeholder="+421 915 785 007"
          autoComplete="tel"
          maxLength={20}
          disabled={status === 'loading'}
        />
        {errors.phone && (
          <p id="phone-error" className="text-sm text-destructive mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Správa <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`w-full px-4 py-2 rounded-md border ${errors.message ? 'border-destructive' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y`}
          placeholder="Mám záujem o adopciu psíka..."
          autoComplete="off"
          maxLength={2000}
          disabled={status === 'loading'}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Odosielam...' : 'Odoslať správu'}
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

      <p className="text-xs text-muted-foreground">
        <span className="text-destructive" aria-hidden="true">*</span> Povinné polia
      </p>
    </form>
  );
}
