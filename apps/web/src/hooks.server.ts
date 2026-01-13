import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { env } from '$env/dynamic/private';

const API_BASE_URL = env.API_URL || 'http://localhost:3000';

interface AuthUser {
	id: string;
	email: string;
	role: string;
}

const auth: Handle = async ({ event, resolve }) => {
	const accessToken = event.cookies.get('access_token');

	event.locals.getAccessToken = () => accessToken || null;

	event.locals.getUser = async (): Promise<AuthUser | null> => {
		if (!accessToken) {
			return null;
		}

		try {
			const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});

			if (!response.ok) {
				// Token is invalid, clear cookies
				event.cookies.delete('access_token', { path: '/' });
				event.cookies.delete('refresh_token', { path: '/' });
				return null;
			}

			const data = await response.json();
			return data.user as AuthUser;
		} catch {
			return null;
		}
	};

	return resolve(event);
};

const authGuard: Handle = async ({ event, resolve }) => {
	const user = await event.locals.getUser();
	event.locals.user = user;

	if (!user && event.url.pathname.startsWith('/account')) {
		redirect(303, '/signin');
	}

	if (user && event.url.pathname === '/signin') {
		redirect(303, '/account');
	}

	return resolve(event);
};

export const handle: Handle = sequence(auth, authGuard);
