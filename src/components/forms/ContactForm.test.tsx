import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

// Helper: fill in all required fields with valid data
async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/meno a priezvisko/i), 'Ján Novák');
  await user.type(screen.getByLabelText(/email/i), 'jan@example.sk');
  await user.type(screen.getByLabelText(/správa/i), 'Mám záujem o adopciu psíka zo sheltera.');
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders all form fields and submit button', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/meno a priezvisko/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefón/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/správa/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /odoslať správu/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /odoslať správu/i }));

    expect(await screen.findByText(/meno musí mať aspoň 2 znaky/i)).toBeInTheDocument();
    expect(screen.getByText(/email je povinný/i)).toBeInTheDocument();
    expect(screen.getByText(/správa musí mať aspoň 10 znakov/i)).toBeInTheDocument();
  });

  it('clears a field error when the user starts typing in that field', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Trigger validation errors
    await user.click(screen.getByRole('button', { name: /odoslať správu/i }));
    expect(await screen.findByText(/meno musí mať aspoň 2 znaky/i)).toBeInTheDocument();

    // Start typing in the name field
    await user.type(screen.getByLabelText(/meno a priezvisko/i), 'J');
    expect(screen.queryByText(/meno musí mať aspoň 2 znaky/i)).not.toBeInTheDocument();
  });

  it('shows loading state while submitting', async () => {
    const user = userEvent.setup();

    // Fetch never resolves during this test
    vi.mocked(fetch).mockReturnValue(new Promise(() => {}));

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /odoslať správu/i }));

    expect(await screen.findByRole('button', { name: /odosielam/i })).toBeDisabled();
  });

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /odoslať správu/i }));

    expect(await screen.findByText(/správa bola úspešne odoslaná/i)).toBeInTheDocument();
  });

  it('shows error message when API returns failure', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: false, message: 'API error' }),
    } as Response);

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /odoslať správu/i }));

    expect(await screen.findByText(/nastala chyba pri odosielaní/i)).toBeInTheDocument();
  });

  it('shows error message when fetch throws a network error', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /odoslať správu/i }));

    expect(await screen.findByText(/nastala chyba pri odosielaní/i)).toBeInTheDocument();
  });

  it('resets form fields after successful submission', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /odoslať správu/i }));

    await screen.findByText(/správa bola úspešne odoslaná/i);

    expect(screen.getByLabelText(/meno a priezvisko/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/správa/i)).toHaveValue('');
  });

  it('silently ignores submission when honeypot is filled', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);

    // Fill the honeypot (hidden from real users)
    const honeypot = document.querySelector('input[name="website"]') as HTMLInputElement;
    await user.type(honeypot, 'bot@spam.com');

    await user.click(screen.getByRole('button', { name: /odoslať správu/i }));

    // fetch should never be called
    await waitFor(() => {
      expect(fetch).not.toHaveBeenCalled();
    });
  });
});
