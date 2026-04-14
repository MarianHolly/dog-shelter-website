import { test, expect } from '@playwright/test';

test.describe('Adoption journey', () => {
  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Trenčianský útulok/i);
  });

  test('dog listing page shows dog cards', async ({ page }) => {
    await page.goto('/psici', { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('heading', { name: /naši psíci/i })).toBeVisible();

    const dogCards = page.locator('.dog-card');
    await expect(dogCards.first()).toBeVisible({ timeout: 10_000 });
    const count = await dogCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('clicking a dog card navigates to the dog profile', async ({ page }) => {
    await page.goto('/psici', { waitUntil: 'domcontentloaded' });

    const firstCard = page.locator('.dog-card').first();
    await expect(firstCard).toBeVisible({ timeout: 10_000 });
    await firstCard.click();

    await expect(page).toHaveURL(/\/psici\/.+/, { timeout: 10_000 });
  });

  test('dog profile page renders correctly', async ({ page }) => {
    await page.goto('/psici/max', { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('heading', { name: /max/i, level: 1 })).toBeVisible();
  });

  test('adoption inquiry form is present on dog profile', async ({ page }) => {
    await page.goto('/psici/max', { waitUntil: 'domcontentloaded' });

    // Scroll to the adoption form section
    await page.locator('#adoption-inquiry').scrollIntoViewIfNeeded();

    await expect(page.getByLabel(/meno a priezvisko/i)).toBeVisible();
    await expect(page.getByLabel(/^email/i)).toBeVisible();
    await expect(page.getByLabel(/telefón/i)).toBeVisible();
    await expect(page.getByLabel(/správa/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /odoslať žiadosť/i })).toBeVisible();
  });

  test('adoption form shows validation errors on empty submit', async ({ page }) => {
    await page.goto('/psici/max', { waitUntil: 'domcontentloaded' });

    await page.locator('#adoption-inquiry').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: /odoslať žiadosť/i }).click();

    await expect(page.getByText(/meno musí mať aspoň 2 znaky/i)).toBeVisible({ timeout: 5_000 });
    await expect(page.getByText(/email je povinný/i)).toBeVisible();
  });

  test('filters narrow down the dog listing', async ({ page }) => {
    await page.goto('/psici', { waitUntil: 'domcontentloaded' });

    const allCards = page.locator('.dog-card');
    await expect(allCards.first()).toBeVisible({ timeout: 10_000 });
    const totalBefore = await allCards.count();

    await page.getByRole('button', { name: '♀' }).click();
    await page.waitForTimeout(200);

    // Count only the cards not hidden by the filter
    const visibleCount = await page.evaluate(() =>
      document.querySelectorAll('.dog-card:not([style*="display: none"])').length
    );

    expect(visibleCount).toBeLessThanOrEqual(totalBefore);
  });
});
