// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

interface AuthUser {
	id: string;
	email: string;
	role: string;
}

declare global {
	namespace App {
		interface Locals {
			getAccessToken: () => string | null;
			getUser: () => Promise<AuthUser | null>;
			user: AuthUser | null;
		}
		interface PageData {
			user: AuthUser | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
