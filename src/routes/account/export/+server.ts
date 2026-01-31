import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createSupabaseAdmin } from '$lib/server/supabase-admin';

/**
 * GET /api/user/export
 *
 * RGPD Article 20 - Right to Data Portability
 * Exports all user data in a portable JSON format.
 *
 * Requires: Authentication
 * Returns: 200 OK with all user data
 */
export const GET: RequestHandler = async ({ locals }) => {
	// Verify user is authenticated
	const { session, user } = await locals.safeGetSession();

	if (!session || !user) {
		throw error(401, { message: 'Authentication required' });
	}

	const userId = user.id;

	try {
		const supabaseAdmin = createSupabaseAdmin();

		// Collect all user data from various tables
		const [
			{ data: favorites },
			{ data: solutions },
			{ data: conversations },
			{ data: monitoring }
		] = await Promise.all([
			supabaseAdmin.from('favorites').select('*').eq('user_id', userId),
			supabaseAdmin.from('solutions').select('*').eq('user_id', userId),
			supabaseAdmin.from('conversations').select('*').eq('user_id', userId),
			supabaseAdmin.from('ghost_monitoring').select('*').eq('user_id', userId)
		]);

		// Get user profile data
		const { data: userData } = await supabaseAdmin.auth.admin.getUserById(userId);

		const exportData = {
			exported_at: new Date().toISOString(),
			format_version: '1.0',
			user: {
				id: user.id,
				email: user.email,
				created_at: user.created_at,
				last_sign_in_at: user.last_sign_in_at,
				user_metadata: userData?.user?.user_metadata || {}
			},
			data: {
				favorites: favorites || [],
				solutions: solutions || [],
				conversations: conversations || [],
				ghost_monitoring: monitoring || []
			},
			data_retention: {
				policy: 'Data is retained for 90 days after account deletion',
				legal_basis: 'RGPD Article 6(1)(b) - Contract execution'
			}
		};

		return json(exportData);
	} catch (err) {
		console.error('Error exporting user data:', err);
		throw error(500, { message: 'An error occurred while exporting your data' });
	}
};
