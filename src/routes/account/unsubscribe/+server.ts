import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createSupabaseAdmin } from '$lib/server/supabase-admin';

/**
 * POST /api/user/unsubscribe
 *
 * Removes a specific ghost monitoring subscription.
 * Users can stop receiving notifications for monitored properties.
 *
 * Requires: Authentication + monitoring_id in request body
 * Returns: 200 OK with unsubscription confirmation
 */
export const POST: RequestHandler = async ({ locals, request }) => {
	// Verify user is authenticated
	const { session, user } = await locals.safeGetSession();

	if (!session || !user) {
		throw error(401, { message: 'Authentication required' });
	}

	// Parse request body
	let body: { monitoring_id?: string };
	try {
		body = await request.json();
	} catch {
		throw error(400, { message: 'Invalid request body' });
	}

	if (!body.monitoring_id) {
		throw error(400, { message: 'monitoring_id is required' });
	}

	const userId = user.id;
	const monitoringId = body.monitoring_id;

	try {
		const supabaseAdmin = createSupabaseAdmin();

		// Verify the monitoring belongs to this user before deleting
		const { data: existing, error: fetchError } = await supabaseAdmin
			.from('ghost_monitoring')
			.select('id')
			.eq('id', monitoringId)
			.eq('user_id', userId)
			.single();

		if (fetchError || !existing) {
			throw error(404, { message: 'Monitoring subscription not found' });
		}

		// Delete the monitoring subscription
		const { error: deleteError } = await supabaseAdmin
			.from('ghost_monitoring')
			.delete()
			.eq('id', monitoringId)
			.eq('user_id', userId);

		if (deleteError) {
			console.error('Error deleting monitoring subscription:', deleteError.message);
			throw error(500, { message: 'Failed to unsubscribe from monitoring' });
		}

		return json({
			unsubscribed: true,
			monitoring_id: monitoringId,
			message: 'Successfully unsubscribed from ghost monitoring'
		});
	} catch (err) {
		if (err instanceof Error && 'status' in err) {
			throw err; // Re-throw SvelteKit errors
		}
		console.error('Error during unsubscribe:', err);
		throw error(500, { message: 'An error occurred while unsubscribing' });
	}
};
