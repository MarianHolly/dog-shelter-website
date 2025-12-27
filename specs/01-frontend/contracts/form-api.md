# Web3Forms API Contract

**Service**: Web3Forms
**Purpose**: Form submission handling for contact, adoption inquiry, and volunteer forms
**Documentation**: https://docs.web3forms.com/
**Free Tier**: 250 submissions/month
**Cost**: €0/month within free tier limits

---

## Endpoint

**URL**: `https://api.web3forms.com/submit`
**Method**: `POST`
**Content-Type**: `application/json` or `application/x-www-form-urlencoded`

---

## Authentication

**Access Key**: Required in request body as `access_key` field
**Source**: Web3Forms dashboard (https://web3forms.com/dashboard)
**Storage**: Environment variable `PUBLIC_WEB3FORMS_KEY` (exposed to client)

**Important**: Access key is public (included in client-side forms). Web3Forms uses domain restrictions for security, not API key secrecy.

---

## Request Format

### Required Fields

```json
{
  "access_key": "YOUR_ACCESS_KEY",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I would like to adopt Max..."
}
```

### Optional Fields

```json
{
  "subject": "Adoption inquiry for Max",
  "phone": "+421 123 456 789",
  "redirect": "https://utulok-trencin.sk/dakujeme",
  "botcheck": "",
  "cc_email": "shelter@utulok-trencin.sk",
  "from_name": "Trenčianský útulok",
  "replyto": "john@example.com"
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `access_key` | string | Yes | Web3Forms API access key |
| `name` | string | Yes | Sender's full name |
| `email` | string | Yes | Sender's email address (validated) |
| `message` | string | Yes | Message content (max 10,000 characters) |
| `subject` | string | No | Email subject line (default: "New submission from {name}") |
| `phone` | string | No | Sender's phone number |
| `redirect` | string | No | URL to redirect after successful submission |
| `botcheck` | string | No | Honeypot field (must be empty to prevent spam) |
| `cc_email` | string | No | Send copy to additional email |
| `from_name` | string | No | Display name in "From" field |
| `replyto` | string | No | Reply-To email address (defaults to sender's email) |

---

## Response Format

### Success Response

**Status Code**: `200 OK`

```json
{
  "success": true,
  "message": "Form submitted successfully"
}
```

### Error Response

**Status Code**: `422 Unprocessable Entity`

```json
{
  "success": false,
  "message": "Validation error: email is required"
}
```

### Rate Limit Response

**Status Code**: `429 Too Many Requests`

```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```

---

## Implementation Examples

### Contact Form (General)

```typescript
// src/components/forms/ContactForm.tsx
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

async function submitContactForm(data: ContactFormData) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_key: import.meta.env.PUBLIC_WEB3FORMS_KEY,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      subject: 'Kontakt z webstránky',
      from_name: 'Trenčianský útulok - Kontaktný formulár',
      botcheck: '', // Honeypot field
    }),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || 'Odoslanie zlyhalo');
  }

  return result;
}
```

### Adoption Inquiry Form (Dog-Specific)

```typescript
// src/components/forms/AdoptionInquiryForm.tsx
interface AdoptionInquiryData {
  name: string;
  email: string;
  phone: string;
  message: string;
  dogName: string;
  dogSlug: string;
}

async function submitAdoptionInquiry(data: AdoptionInquiryData) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_key: import.meta.env.PUBLIC_WEB3FORMS_KEY,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      subject: `Záujem o adopciu - ${data.dogName}`,
      from_name: `Trenčianský útulok - Adopcia (${data.dogName})`,
      botcheck: '',
      // Custom fields for tracking
      'Dog Name': data.dogName,
      'Dog Profile': `https://utulok-trencin.sk/psici/${data.dogSlug}`,
    }),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || 'Odoslanie zlyhalo');
  }

  return result;
}
```

### Volunteer Form

```typescript
// src/components/forms/VolunteerForm.tsx
interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  availability: string; // "Víkendy", "Pracovné dni", "Kedykoľvek"
}

async function submitVolunteerForm(data: VolunteerFormData) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_key: import.meta.env.PUBLIC_WEB3FORMS_KEY,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      subject: 'Záujem o dobrovoľníctvo',
      from_name: 'Trenčianský útulok - Dobrovoľníctvo',
      botcheck: '',
      'Availability': data.availability,
    }),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || 'Odoslanie zlyhalo');
  }

  return result;
}
```

---

## Client-Side Validation

**Required Validation Rules**:

```typescript
// src/utils/formValidation.ts
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Slovak phone format: +421 XXX XXX XXX or 0XXX XXX XXX
  const phoneRegex = /^(\+421|0)[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

export function validateMessage(message: string): boolean {
  return message.trim().length >= 10;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export function validateContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): FormErrors {
  const errors: FormErrors = {};

  if (!validateName(data.name)) {
    errors.name = 'Meno musí mať aspoň 2 znaky';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Neplatná emailová adresa';
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Neplatné telefónne číslo';
  }

  if (!validateMessage(data.message)) {
    errors.message = 'Správa musí mať aspoň 10 znakov';
  }

  return errors;
}
```

---

## Error Handling

### Error Types

1. **Validation Errors** (422): Missing or invalid required fields
2. **Rate Limiting** (429): Too many submissions (limit: 250/month)
3. **Network Errors**: Connection timeout, DNS failures
4. **Server Errors** (500): Web3Forms service issues

### Error Handling Pattern

```typescript
async function handleFormSubmission(formData: ContactFormData) {
  // 1. Client-side validation
  const errors = validateContactForm(formData);
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    // 2. API submission
    const result = await submitContactForm(formData);

    // 3. Success state
    return {
      success: true,
      message: 'Správa bola úspešne odoslaná. Ozveme sa vám čoskoro!'
    };

  } catch (error) {
    // 4. Error state
    if (error instanceof TypeError) {
      // Network error
      return {
        success: false,
        message: 'Problém s pripojením. Skontrolujte internetové pripojenie a skúste znova.'
      };
    }

    // API error
    return {
      success: false,
      message: error.message || 'Nastala chyba. Skúste to prosím neskôr.'
    };
  }
}
```

---

## Spam Protection

### Built-in Mechanisms

1. **Honeypot Field**: Add hidden `botcheck` field (bots auto-fill it)
2. **reCAPTCHA**: Optional integration for high-spam scenarios
3. **Domain Restrictions**: Configure allowed domains in Web3Forms dashboard
4. **Rate Limiting**: 250 submissions/month prevents abuse

### Implementation

```tsx
// Honeypot field (hidden with CSS, not display:none)
<input
  type="checkbox"
  name="botcheck"
  className="absolute w-0 h-0 opacity-0"
  tabIndex={-1}
  autoComplete="off"
/>
```

---

## Monitoring & Limits

### Free Tier Limits

- **250 submissions/month**
- **10,000 characters per message**
- **No file attachments** (use Cloudinary + custom field for URLs if needed)

### Usage Monitoring

- Check Web3Forms dashboard for submission count
- Set up monthly reminder to review usage
- If approaching limit, consider:
  1. Upgrading to paid plan (€4/month for 1,000 submissions)
  2. Filtering spam more aggressively
  3. Adding reCAPTCHA

---

## Security Considerations

1. **Access Key Exposure**: Access key is public (in client-side code). Web3Forms uses domain whitelist for security.
2. **Domain Whitelisting**: Configure allowed domains in Web3Forms dashboard to prevent unauthorized use.
3. **HTTPS Only**: Always use HTTPS for form submissions.
4. **Input Sanitization**: Web3Forms auto-sanitizes inputs, but validate on client side for UX.
5. **GDPR Compliance**: Forms do NOT store data in Web3Forms beyond email delivery. No GDPR issues.

---

## Testing

### Manual Testing Checklist

- [ ] Submit form with valid data → success message
- [ ] Submit form with missing email → validation error
- [ ] Submit form with invalid email → validation error
- [ ] Submit form with honeypot filled → submission blocked
- [ ] Check email arrives at shelter inbox
- [ ] Verify email content includes all form fields
- [ ] Test phone validation with Slovak formats
- [ ] Test on mobile (touch-friendly inputs)

### Test Credentials

**Test Access Key**: Use production key (Web3Forms doesn't provide test keys)
**Test Email**: Use real email to verify delivery
**Spam Testing**: Fill honeypot field to verify blocking

---

## Rollback Plan

If Web3Forms fails or hits limits:

1. **Fallback to mailto**: Replace form with `mailto:` link
2. **Switch to Formspree**: Similar API, 50 submissions/month free
3. **Self-hosted**: Use Cloudflare Workers + email service (requires dev work)

---

**Status**: Ready for Implementation ✅
**Last Updated**: 2025-12-27
**Next Steps**: Implement ContactForm.tsx, AdoptionInquiryForm.tsx, VolunteerForm.tsx components
