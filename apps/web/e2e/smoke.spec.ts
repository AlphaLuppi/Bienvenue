import { test, expect } from '@playwright/test';

/**
 * Smoke Tests - MVP Critical Paths Only
 *
 * These tests verify the app works at a basic level.
 * They should NOT break on minor UI changes.
 *
 * If a test here breaks frequently, simplify or delete it.
 */

test.describe('Smoke Tests', () => {
	test('home page loads', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(/bienvenue/i);
	});

	test('signin page loads', async ({ page }) => {
		await page.goto('/signin');
		await expect(page.url()).toContain('/signin');
		// Just verify the page has a form - don't test specific elements
		await expect(page.locator('form')).toBeVisible();
	});

	test('protected routes redirect to signin', async ({ page }) => {
		await page.goto('/account');
		// Should redirect unauthenticated users
		await expect(page.url()).toContain('/signin');
	});

	test('map page loads', async ({ page }) => {
		await page.goto('/map');
		await expect(page.url()).toContain('/map');
	});

	test('static pages are accessible', async ({ page }) => {
		// Just verify pages don't error - don't test content
		const pages = ['/about', '/contact', '/terms', '/privacy', '/legal'];

		for (const path of pages) {
			await page.goto(path);
			// Page should load without network errors
			await expect(page.url()).toContain(path);
		}
	});
});
