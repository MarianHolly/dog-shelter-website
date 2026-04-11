import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsletterForm from './NewsletterForm';

describe('NewsletterForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders email input, consent checkbox, and submit button', () => {
    render(<NewsletterForm />);

    expect(screen.getByLabelText(/emailová adresa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/súhlasím/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /prihlásiť sa na odber/i })).toBeInTheDocument();
  });

  it('shows email validation error when submitting empty email', async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.click(screen.getByRole('button', { name: /prihlásiť sa na odber/i }));

    expect(await screen.findByText(/email je povinný|neplatná emailová adresa/i)).toBeInTheDocument();
  });

  it('shows consent validation error when checkbox is unchecked', async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText(/emailová adresa/i), 'test@example.sk');
    await user.click(screen.getByRole('button', { name: /prihlásiť sa na odber/i }));

    expect(await screen.findByText(/musíte súhlasiť so spracovaním/i)).toBeInTheDocument();
  });

  it('clears email error when user starts typing', async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.click(screen.getByRole('button', { name: /prihlásiť sa na odber/i }));
    expect(await screen.findByText(/email je povinný|neplatná emailová adresa/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/emailová adresa/i), 't');
    expect(screen.queryByText(/zadajte platnú emailovú adresu/i)).not.toBeInTheDocument();
  });

  it('shows loading state while submitting', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockReturnValue(new Promise(() => {}));

    render(<NewsletterForm />);
    await user.type(screen.getByLabelText(/emailová adresa/i), 'test@example.sk');
    await user.click(screen.getByLabelText(/súhlasím/i));
    await user.click(screen.getByRole('button', { name: /prihlásiť sa na odber/i }));

    expect(await screen.findByRole('button', { name: /prihlasovanie/i })).toBeDisabled();
  });

  it('shows success message after successful subscription', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<NewsletterForm />);
    await user.type(screen.getByLabelText(/emailová adresa/i), 'test@example.sk');
    await user.click(screen.getByLabelText(/súhlasím/i));
    await user.click(screen.getByRole('button', { name: /prihlásiť sa na odber/i }));

    expect(await screen.findByText(/skontrolujte svoj email/i)).toBeInTheDocument();
  });

  it('shows error message when API returns failure', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Server error' }),
    } as Response);

    render(<NewsletterForm />);
    await user.type(screen.getByLabelText(/emailová adresa/i), 'test@example.sk');
    await user.click(screen.getByLabelText(/súhlasím/i));
    await user.click(screen.getByRole('button', { name: /prihlásiť sa na odber/i }));

    expect(await screen.findByText(/nastala chyba pri prihlasovaní/i)).toBeInTheDocument();
  });

  it('resets form after successful subscription', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<NewsletterForm />);
    await user.type(screen.getByLabelText(/emailová adresa/i), 'test@example.sk');
    await user.click(screen.getByLabelText(/súhlasím/i));
    await user.click(screen.getByRole('button', { name: /prihlásiť sa na odber/i }));

    await screen.findByText(/skontrolujte svoj email/i);

    expect(screen.getByLabelText(/emailová adresa/i)).toHaveValue('');
    expect(screen.getByLabelText(/súhlasím/i)).not.toBeChecked();
  });

  it('calls /api/newsletter endpoint with the email', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<NewsletterForm />);
    await user.type(screen.getByLabelText(/emailová adresa/i), 'test@example.sk');
    await user.click(screen.getByLabelText(/súhlasím/i));
    await user.click(screen.getByRole('button', { name: /prihlásiť sa na odber/i }));

    await screen.findByText(/skontrolujte svoj email/i);

    expect(fetch).toHaveBeenCalledWith('/api/newsletter', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.sk' }),
    }));
  });
});
