export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
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

  if (!email || typeof email !== 'string') {
    return new Response(JSON.stringify({ error: 'Email je povinný.' }), {
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
