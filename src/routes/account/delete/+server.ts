import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createSupabaseAdmin } from '$lib/server/supabase-admin';

/**
 * DELETE /api/user/delete
 *
 * RGPD Article 17 - Right to Erasure
 * Permanently deletes the user account and all associated data.
 *
 * Requires: Authentication + confirmation in request body
 * Returns: 200 OK with deletion confirmation
 */
export const DELETE: RequestHandler = async ({ locals, request }) => {
	// Verify user is authenticated
	const { session, user } = await locals.safeGetSession();

	if (!session || !user) {
		throw error(401, { message: 'Authentication required' });
	}

	// Parse request body for confirmation
	let body: { confirm?: boolean };
	try {
		body = await request.json();
	} catch {
		throw error(400, { message: 'Invalid request body' });
	}

	if (body.confirm !== true) {
		throw error(400, { message: 'Deletion must be confirmed with { "confirm": true }' });
	}

	const userId = user.id;

	try {
		const supabaseAdmin = createSupabaseAdmin();

		// Delete user data from all tables (order matters for foreign keys)
		// 1. Delete favorites
		await supabaseAdmin.from('favorites').delete().eq('user_id', userId);

		// 2. Delete solutions
		await supabaseAdmin.from('solutions').delete().eq('user_id', userId);

		// 3. Delete conversations/messages
		await supabaseAdmin.from('conversations').delete().eq('user_id', userId);

		// 4. Delete user monitoring subscriptions
		await supabaseAdmin.from('ghost_monitoring').delete().eq('user_id', userId);

		// 5. Finally, delete the user from auth
		const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

		if (deleteError) {
			console.error('Error deleting user from auth:', deleteError.message);
			throw error(500, { message: 'Failed to delete user account' });
		}

		return json({
			deleted: true,
			user_id: userId,
			message: 'Your account and all associated data have been permanently deleted'
		});
	} catch (err) {
		if (err instanceof Error && 'status' in err) {
			throw err; // Re-throw SvelteKit errors
		}
		console.error('Error during user deletion:', err);
		throw error(500, { message: 'An error occurred during account deletion' });
	}
};
