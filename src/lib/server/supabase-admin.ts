import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

/**
 * Creates a Supabase admin client with service role privileges.
 * This client bypasses RLS and should only be used server-side for admin operations.
 *
 * IMPORTANT: Never expose this client to the browser.
 */
export function createSupabaseAdmin() {
	return createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	});
}
