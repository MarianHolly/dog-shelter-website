import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DogFilters from './DogFilters';

describe('DogFilters', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', window.location.pathname);
  });
  it('renders size, gender, energy, and toggle filters', () => {
    render(<DogFilters />);

    // Size buttons (1, 2, 3 dog emojis)
    expect(screen.getByTitle('Malý')).toBeInTheDocument();
    expect(screen.getByTitle('Stredný')).toBeInTheDocument();
    expect(screen.getByTitle('Veľký')).toBeInTheDocument();

    // Gender buttons
    expect(screen.getByRole('button', { name: '♂' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '♀' })).toBeInTheDocument();

    // Toggle buttons
    expect(screen.getByRole('button', { name: /s deťmi/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /urgentné/i })).toBeInTheDocument();
  });

  it('does not show reset button when no filters are active', () => {
    render(<DogFilters />);
    expect(screen.queryByText(/zrušiť/i)).not.toBeInTheDocument();
  });

  it('shows reset button after selecting a filter', async () => {
    const user = userEvent.setup();
    render(<DogFilters />);

    await user.click(screen.getByTitle('Malý'));

    expect(screen.getByText(/zrušiť/i)).toBeInTheDocument();
  });

  it('dispatches dog-filter-change event when size filter is clicked', async () => {
    const user = userEvent.setup();
    render(<DogFilters />);

    const received: CustomEvent[] = [];
    document.addEventListener('dog-filter-change', (e) => received.push(e as CustomEvent));

    await user.click(screen.getByTitle('Stredný'));

    expect(received).toHaveLength(1);
    expect(received[0].detail).toMatchObject({ size: 'Stredný' });
  });

  it('toggles size filter off when clicking the active size again', async () => {
    const user = userEvent.setup();
    render(<DogFilters />);

    const received: CustomEvent[] = [];
    document.addEventListener('dog-filter-change', (e) => received.push(e as CustomEvent));

    await user.click(screen.getByTitle('Veľký'));
    await user.click(screen.getByTitle('Veľký'));

    expect(received[1].detail).toMatchObject({ size: '' });
  });

  it('dispatches event with goodWithKids: true when kids toggle is clicked', async () => {
    const user = userEvent.setup();
    render(<DogFilters />);

    const received: CustomEvent[] = [];
    document.addEventListener('dog-filter-change', (e) => received.push(e as CustomEvent));

    await user.click(screen.getByRole('button', { name: /s deťmi/i }));

    expect(received[0].detail).toMatchObject({ goodWithKids: true });
  });

  it('dispatches event with all filters reset when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<DogFilters />);

    const received: CustomEvent[] = [];
    document.addEventListener('dog-filter-change', (e) => received.push(e as CustomEvent));

    await user.click(screen.getByTitle('Malý'));
    await user.click(screen.getByRole('button', { name: /s deťmi/i }));

    received.length = 0; // clear previous events
    await user.click(screen.getByText(/zrušiť/i));

    expect(received).toHaveLength(1);
    expect(received[0].detail).toEqual({
      size: '',
      gender: '',
      energy: '',
      goodWithKids: false,
      urgent: false,
    });
  });

  it('calls optional onFilterChange prop when filter changes', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(<DogFilters onFilterChange={onFilterChange} />);

    await user.click(screen.getByTitle('Malý'));

    expect(onFilterChange).toHaveBeenCalledWith(expect.objectContaining({ size: 'Malý' }));
  });

  it('shows "Aktívne" badge when a filter is selected', async () => {
    const user = userEvent.setup();
    render(<DogFilters />);

    expect(screen.queryByText('Aktívne')).not.toBeInTheDocument();
    await user.click(screen.getByTitle('Malý'));
    expect(screen.getByText('Aktívne')).toBeInTheDocument();
  });
});
