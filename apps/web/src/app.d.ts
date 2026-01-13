// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

interface UserProfile {
	username: string | null;
	fullName: string | null;
	avatarUrl: string | null;
}

interface AuthUser {
	id: string;
	email: string;
	role: string;
	profile: UserProfile | null;
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
