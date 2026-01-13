import { test as base, expect } from '@playwright/test';

/**
 * Extended test fixtures for Bienvenue E2E tests
 */
export const test = base.extend({
	// Add custom fixtures here as needed
});

export { expect };

/**
 * Test user credentials for E2E testing
 * These should be test accounts in your Supabase project
 */
export const TEST_USER = {
	email: process.env.TEST_USER_EMAIL || 'test@example.com',
	password: process.env.TEST_USER_PASSWORD || 'testpassword123'
};

/**
 * API endpoints for reference
 */
export const API_URL = process.env.API_URL || 'http://localhost:3000';

/**
 * Helper to wait for navigation to complete
 */
export async function waitForNavigation(page: ReturnType<typeof base['page']>) {
	await page.waitForLoadState('networkidle');
}

/**
 * Helper to check if we're on a specific route
 */
export function expectRoute(page: ReturnType<typeof base['page']>, route: string) {
	expect(page.url()).toContain(route);
}
