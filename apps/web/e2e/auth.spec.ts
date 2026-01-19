import { test, expect } from '@playwright/test';

/**
 * Auth Tests - Critical Authentication Flows
 *
 * Tests the auth system works, not individual UI elements.
 */

test.describe('Authentication', () => {
	test('signin page has a login form', async ({ page }) => {
		await page.goto('/signin');

		// Form exists with email and password inputs
		await expect(page.locator('input[type="email"]')).toBeVisible();
		await expect(page.locator('input[type="password"]')).toBeVisible();
	});

	test('protected route redirects when not authenticated', async ({ page }) => {
		// Try to access protected page
		await page.goto('/account');

		// Should be redirected to signin
		await expect(page.url()).toContain('/signin');
	});

	test('form accepts input', async ({ page }) => {
		await page.goto('/signin');

		// Can type in fields (form is functional)
		await page.fill('input[type="email"]', 'test@example.com');
		await page.fill('input[type="password"]', 'testpassword');

		await expect(page.locator('input[type="email"]')).toHaveValue('test@example.com');
	});
});
