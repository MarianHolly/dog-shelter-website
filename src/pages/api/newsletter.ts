export const prerender = false;

import type { APIRoute } from 'astro';
import { validateEmail } from '@/utils/newsletterValidation';

// Best-effort per-isolate rate limit. Cloudflare Workers isolates aren't
// shared across edge locations, so this doesn't replace a real rate-limiting
// rule (e.g. Cloudflare WAF/Turnstile) — it just stops a single script from
// hammering this endpoint from one connection.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Príliš veľa požiadaviek. Skúste to prosím neskôr.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!request.headers.get('Content-Type')?.includes('application/json')) {
    return new Response(JSON.stringify({ error: 'Neplatný formát požiadavky.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let email: string;

  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return new Response(JSON.stringify({ error: 'Neplatný formát požiadavky.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!email || typeof email !== 'string' || email.length > 254 || !validateEmail(email)) {
    return new Response(JSON.stringify({ error: 'Neplatná emailová adresa.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.MAILERLITE_API_KEY;
  const groupId = import.meta.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !groupId) {
    console.error('Newsletter: missing MAILERLITE_API_KEY or MAILERLITE_GROUP_ID env vars');
    return new Response(JSON.stringify({ error: 'Konfigurácia newslettera nie je dokončená.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      groups: [groupId],
      status: 'unconfirmed',
    }),
  });

  // 200 = updated existing, 201 = created new subscriber
  if (response.ok) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 409 = already subscribed and confirmed — treat as success
  if (response.status === 409) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const errorBody = await response.json().catch(() => ({}));
  console.error('MailerLite error:', response.status, errorBody);

  return new Response(JSON.stringify({ error: 'Prihlásenie na odber sa nepodarilo. Skúste to prosím neskôr.' }), {
    status: 502,
    headers: { 'Content-Type': 'application/json' },
  });
};
