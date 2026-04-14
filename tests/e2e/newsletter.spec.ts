import { test, expect } from '@playwright/test';

test.describe('Newsletter signup', () => {
  // Newsletter form is on the /o-nas (About Us) page
  test.beforeEach(async ({ page }) => {
    await page.goto('/o-nas', { waitUntil: 'domcontentloaded' });
    await page.locator('#newsletter').scrollIntoViewIfNeeded();
  });

  test('newsletter section is visible', async ({ page }) => {
    await expect(page.locator('#newsletter')).toBeVisible();
    await expect(page.getByLabel(/emailová adresa/i)).toBeVisible();
    await expect(page.getByLabel(/súhlasím/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /prihlásiť sa na odber/i })).toBeVisible();
  });

  test('shows email validation error when submitting empty form', async ({ page }) => {
    await page.getByRole('button', { name: /prihlásiť sa na odber/i }).click();

    await expect(page.getByText(/email je povinný/i)).toBeVisible({ timeout: 5_000 });
  });

  test('shows consent validation error when email filled but consent unchecked', async ({ page }) => {
    await page.getByLabel(/emailová adresa/i).fill('test@example.sk');
    await page.getByRole('button', { name: /prihlásiť sa na odber/i }).click();

    await expect(page.getByText(/musíte súhlasiť/i)).toBeVisible({ timeout: 5_000 });
  });

  test('privacy policy link points to correct page', async ({ page }) => {
    const privacyLink = page.locator('#newsletter').getByRole('link', { name: /zásady ochrany/i }).first();
    await expect(privacyLink).toHaveAttribute('href', '/ochrana-udajov');
  });
});

test.describe('Privacy policy page', () => {
  test('loads with correct title and GDPR sections', async ({ page }) => {
    await page.goto('/ochrana-udajov', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/ochrana osobných údajov/i);
    await expect(page.getByRole('heading', { name: /ochrana osobných údajov/i, level: 1 })).toBeVisible();

    // Key GDPR sections
    await expect(page.getByRole('heading', { name: /prevádzkovateľ/i })).toBeVisible();
    await expect(page.getByText(/právny základ/i).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /vaše práva/i })).toBeVisible();
  });

  test('contact email link is present', async ({ page }) => {
    await page.goto('/ochrana-udajov', { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('link', { name: /utulok.trencin@gmail.com/i }).first()).toBeVisible();
  });
});
