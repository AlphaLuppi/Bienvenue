import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration for Bienvenue Web App
 *
 * This configuration is designed to work both locally and in CI.
 * - Local: Expects dev servers to be running (web: 5173, api: 3000)
 * - CI: Auto-starts the dev servers before running tests
 */

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [['html', { open: 'never' }], ['list']],

	use: {
		baseURL: 'http://localhost:5173',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		video: 'on-first-retry'
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	],

	/* Start dev servers before running tests in CI */
	webServer: process.env.CI
		? [
				{
					command: 'bun run dev',
					cwd: '../../',
					url: 'http://localhost:5173',
					reuseExistingServer: !process.env.CI,
					timeout: 120000
				}
			]
		: undefined
});
