# MailerLite API Contract

**Service**: MailerLite
**Purpose**: Newsletter subscription management
**Documentation**: https://developers.mailerlite.com/docs
**Free Tier**: 1,000 subscribers, 12,000 emails/month
**Cost**: €0/month within free tier limits

---

## Endpoint

**Base URL**: `https://api.mailerlite.com/api/v2`
**Primary Endpoint**: `POST /subscribers`
**Method**: `POST`
**Content-Type**: `application/json`

---

## Authentication

**API Key**: Required in HTTP header
**Header Name**: `X-MailerLite-ApiKey`
**Source**: MailerLite dashboard (Integrations → Developer API)
**Storage**: Environment variable `PUBLIC_MAILERLITE_KEY` (server-side only recommended, but public for static site)

**Security Note**: For static sites, API key must be public. Use MailerLite's domain restrictions and rate limiting for security.

---

## Request Format

### Add Subscriber

**Endpoint**: `POST /api/v2/subscribers`

```json
{
  "email": "john@example.com",
  "name": "John Doe",
  "fields": {
    "consent": true,
    "source": "Website footer"
  },
  "type": "unconfirmed",
  "resubscribe": false,
  "autoresponders": true
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Subscriber's email address (validated by MailerLite) |
| `name` | string | No | Subscriber's full name |
| `fields` | object | No | Custom fields (consent, source, etc.) |
| `type` | string | No | Subscription type: "active", "unconfirmed", "unsubscribed" (default: "unconfirmed" for double opt-in) |
| `resubscribe` | boolean | No | Reactivate unsubscribed email (default: false) |
| `autoresponders` | boolean | No | Trigger welcome emails (default: true) |

### Custom Fields

Define in MailerLite dashboard first (Settings → Fields):

```json
{
  "fields": {
    "consent": true,           // Boolean: GDPR consent checkbox
    "source": "Website footer", // Text: Where signup occurred
    "signup_date": "2025-12-27" // Date: Signup timestamp
  }
}
```

---

## Response Format

### Success Response

**Status Code**: `200 OK`

```json
{
  "id": 123456789,
  "email": "john@example.com",
  "name": "John Doe",
  "sent": 0,
  "opened": 0,
  "clicked": 0,
  "type": "unconfirmed",
  "signup_ip": "192.168.1.1",
  "signup_timestamp": "2025-12-27 10:30:00",
  "confirmation_ip": null,
  "confirmation_timestamp": null,
  "fields": {
    "consent": true,
    "source": "Website footer"
  },
  "date_subscribe": null,
  "date_unsubscribe": null,
  "date_created": "2025-12-27 10:30:00",
  "date_updated": "2025-12-27 10:30:00"
}
```

### Error Response - Invalid Email

**Status Code**: `422 Unprocessable Entity`

```json
{
  "error": {
    "message": "The email field is not a valid email address.",
    "code": 422
  }
}
```

### Error Response - Duplicate Subscriber

**Status Code**: `200 OK` (MailerLite returns existing subscriber)

```json
{
  "id": 123456789,
  "email": "john@example.com",
  "type": "active",
  "message": "Subscriber already exists"
}
```

### Error Response - Rate Limit

**Status Code**: `429 Too Many Requests`

```json
{
  "error": {
    "message": "Too many requests. Rate limit exceeded.",
    "code": 429
  }
}
```

### Error Response - Invalid API Key

**Status Code**: `401 Unauthorized`

```json
{
  "error": {
    "message": "Unauthorized. Invalid API key.",
    "code": 401
  }
}
```

---

## Implementation Example

### Newsletter Form Component

```typescript
// src/components/forms/NewsletterForm.tsx
interface NewsletterFormData {
  email: string;
  name?: string;
  consent: boolean;
}

async function subscribeToNewsletter(data: NewsletterFormData): Promise<{
  success: boolean;
  message: string;
}> {
  // Validate consent
  if (!data.consent) {
    throw new Error('Musíte súhlasiť so spracovaním osobných údajov');
  }

  // API request
  const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': import.meta.env.PUBLIC_MAILERLITE_KEY,
    },
    body: JSON.stringify({
      email: data.email,
      name: data.name,
      fields: {
        consent: data.consent,
        source: 'Website footer',
        signup_date: new Date().toISOString().split('T')[0],
      },
      type: 'unconfirmed', // Require double opt-in
      autoresponders: true, // Send welcome email
    }),
  });

  const result = await response.json();

  // Handle errors
  if (!response.ok) {
    if (response.status === 422) {
      throw new Error('Neplatná emailová adresa');
    }
    if (response.status === 429) {
      throw new Error('Príliš veľa pokusov. Skúste to prosím neskôr.');
    }
    throw new Error('Nastala chyba. Skúste to prosím neskôr.');
  }

  // Success
  return {
    success: true,
    message: result.type === 'active'
      ? 'Už ste prihlásený na odber noviniek!'
      : 'Skontrolujte svoj email a potvrďte prihlásenie.',
  };
}
```

### Newsletter Form UI

```tsx
// src/components/forms/NewsletterForm.tsx
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const result = await subscribeToNewsletter({ email, consent });
      setStatus('success');
      setMessage(result.message);
      setEmail('');
      setConsent(false);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Nastala chyba');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Emailová adresa
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm"
          placeholder="vas@email.sk"
        />
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-stone-300"
        />
        <label htmlFor="consent" className="ml-2 text-sm">
          Súhlasím so spracovaním osobných údajov za účelom zasielania noviniek.{' '}
          <a href="/ochrana-udajov" className="underline">
            Zásady ochrany osobných údajov
          </a>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-md bg-terracotta-600 px-4 py-2 text-white hover:bg-terracotta-700 disabled:opacity-50"
      >
        {status === 'loading' ? 'Odosielam...' : 'Prihlásiť sa'}
      </button>

      {status === 'success' && (
        <p className="text-sm text-green-600">{message}</p>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-600">{message}</p>
      )}
    </form>
  );
}
```

---

## Client-Side Validation

```typescript
// src/utils/newsletterValidation.ts
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateConsent(consent: boolean): boolean {
  return consent === true;
}

export interface NewsletterErrors {
  email?: string;
  consent?: string;
}

export function validateNewsletterForm(data: {
  email: string;
  consent: boolean;
}): NewsletterErrors {
  const errors: NewsletterErrors = {};

  if (!data.email) {
    errors.email = 'Email je povinný';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Neplatná emailová adresa';
  }

  if (!data.consent) {
    errors.consent = 'Musíte súhlasiť so spracovaním osobných údajov';
  }

  return errors;
}
```

---

## GDPR Compliance

### Requirements

1. **Consent Checkbox**: Mandatory, unchecked by default
2. **Privacy Policy Link**: Link to data processing terms
3. **Double Opt-In**: Require email confirmation (type: "unconfirmed")
4. **Easy Unsubscribe**: MailerLite auto-includes unsubscribe link in emails
5. **Data Storage**: MailerLite is EU-based (Lithuania), GDPR compliant

### Consent Text

**Slovak (Primary)**:
```
Súhlasím so spracovaním osobných údajov (email, meno) za účelom
zasielania noviniek o psíkoch, udalostiach a aktivitách útulku.
Súhlas môžem kedykoľvek odvolať.
```

**English (Fallback)**:
```
I agree to the processing of personal data (email, name) for the
purpose of sending newsletters about dogs, events, and shelter
activities. I can withdraw my consent at any time.
```

### Privacy Policy Requirements

Create `/src/pages/ochrana-udajov.astro` page with:
- Controller identity (Trenčianský útulok)
- Purpose of data processing (newsletter)
- Legal basis (consent, GDPR Article 6(1)(a))
- Data retention period (until unsubscribe)
- Right to access, rectify, delete data
- Right to withdraw consent (unsubscribe link)
- Contact for data protection queries

---

## Double Opt-In Flow

### 1. User Submits Form
- API call creates subscriber with `type: "unconfirmed"`

### 2. MailerLite Sends Confirmation Email
- Subject: "Potvrďte prihlásenie na odber" (configured in MailerLite)
- Contains confirmation link
- Sent automatically by MailerLite

### 3. User Clicks Confirmation Link
- MailerLite updates subscriber to `type: "active"`
- Triggers welcome autoresponder (if configured)

### 4. Welcome Email (Optional)
- Configure in MailerLite: Automation → Autoresponders
- Subject: "Vitajte v našej komunite!"
- Content: Thank you, what to expect, shelter info

---

## Groups and Segments

### MailerLite Groups

Create groups in MailerLite dashboard for segmentation:

1. **Website Signups** - All subscribers from website
2. **Adoption Interests** - Users who inquired about dogs
3. **Virtual Adopters** - Active virtual adoption sponsors
4. **Volunteers** - Volunteer applicants

### Adding to Group

```typescript
// Add subscriber to "Website Signups" group
const response = await fetch(
  'https://api.mailerlite.com/api/v2/groups/{GROUP_ID}/subscribers',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': import.meta.env.PUBLIC_MAILERLITE_KEY,
    },
    body: JSON.stringify({
      email: 'john@example.com',
      type: 'unconfirmed',
    }),
  }
);
```

**Note**: For MVP, use single "Website Signups" group. Add segmentation in Phase 2.

---

## Error Handling

### Error Types

1. **Validation Errors** (422): Invalid email format
2. **Rate Limiting** (429): Too many API calls
3. **Authentication Errors** (401): Invalid API key
4. **Network Errors**: Connection timeout
5. **Server Errors** (500): MailerLite service issues

### Error Handling Pattern

```typescript
async function handleNewsletterSubmission(data: NewsletterFormData) {
  // 1. Client-side validation
  const errors = validateNewsletterForm(data);
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    // 2. API submission
    const result = await subscribeToNewsletter(data);

    // 3. Success state
    return {
      success: true,
      message: result.message,
    };

  } catch (error) {
    // 4. Error state
    let message = 'Nastala chyba. Skúste to prosím neskôr.';

    if (error instanceof TypeError) {
      message = 'Problém s pripojením. Skontrolujte internet.';
    } else if (error instanceof Error) {
      message = error.message;
    }

    return { success: false, message };
  }
}
```

---

## Monitoring & Limits

### Free Tier Limits

- **1,000 subscribers**
- **12,000 emails/month** (averages to 12 emails per subscriber)
- **Unlimited campaigns**
- **Basic automation**

### Usage Monitoring

**Check MailerLite Dashboard**:
- Subscribers → Total count
- Analytics → Email sending usage
- Set up monthly reminder to review

**Upgrade Path** (if limits exceeded):
- 1,000-2,500 subscribers: €10/month
- 2,500-5,000 subscribers: €15/month

### Best Practices

- **Weekly Newsletter**: 4 emails/month per subscriber = 250 subscribers max
- **Bi-weekly Newsletter**: 2 emails/month per subscriber = 500 subscribers max
- **Monthly Newsletter**: 1 email/month per subscriber = 1,000 subscribers max

**Recommendation**: Start with monthly newsletter to maximize subscriber capacity.

---

## Testing

### Manual Testing Checklist

- [ ] Submit form with valid email → success message
- [ ] Submit form without consent → error
- [ ] Submit form with invalid email → validation error
- [ ] Check confirmation email arrives
- [ ] Click confirmation link → subscriber becomes active
- [ ] Submit duplicate email → appropriate message
- [ ] Test unsubscribe link in email
- [ ] Verify subscriber appears in MailerLite dashboard
- [ ] Test welcome autoresponder (if configured)

### Test Credentials

**Test Email**: Use real email to verify double opt-in flow
**API Key**: Use production key (MailerLite doesn't provide test keys)

---

## Security Considerations

1. **API Key Exposure**: For static sites, API key must be public. MailerLite doesn't support domain restrictions, so monitor usage regularly.
2. **Rate Limiting**: MailerLite has built-in rate limits (120 requests/minute). Static site unlikely to hit this.
3. **HTTPS Only**: Always use HTTPS for API calls.
4. **Input Sanitization**: MailerLite auto-sanitizes inputs.
5. **GDPR Compliance**: Double opt-in + privacy policy required.

---

## Alternative: Server-Side Proxy (Optional)

For better security, consider Cloudflare Workers proxy:

**Benefits**:
- Hide API key from client
- Add custom validation
- Prevent abuse

**Implementation** (Phase 2):

```typescript
// workers/newsletter-subscribe.ts
export default {
  async fetch(request: Request) {
    const { email, consent } = await request.json();

    // Validate
    if (!consent || !email) {
      return new Response('Invalid data', { status: 422 });
    }

    // Call MailerLite API
    const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': env.MAILERLITE_KEY, // Server-side secret
      },
      body: JSON.stringify({ email, fields: { consent } }),
    });

    return response;
  },
};
```

**Note**: Not required for MVP. Static site with public API key is acceptable for low-traffic sites.

---

## Rollback Plan

If MailerLite fails or hits limits:

1. **Fallback to Mailchimp**: Similar API, 500 subscribers free
2. **Fallback to Web3Forms**: Collect emails via contact form, manual import to email service
3. **Self-hosted**: Use Cloudflare Workers + email service (requires dev work)

---

**Status**: Ready for Implementation ✅
**Last Updated**: 2025-12-27
**Next Steps**:
1. Create MailerLite account and get API key
2. Configure custom fields (consent, source, signup_date)
3. Set up double opt-in confirmation email (Slovak language)
4. Configure welcome autoresponder (optional)
5. Implement NewsletterForm.tsx component
6. Add newsletter form to Footer, Homepage, Blog pages
