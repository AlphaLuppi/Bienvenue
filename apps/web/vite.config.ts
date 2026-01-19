import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: ''
			}
		}
	},
	optimizeDeps: {
		include: ['leaflet']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
