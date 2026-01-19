import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
	private readonly logger = new Logger(SupabaseService.name);
	private supabase: SupabaseClient;
	private supabaseAdmin: SupabaseClient;

	constructor(private configService: ConfigService) {
		const supabaseUrl = this.configService.get<string>('SUPABASE_URL')!;
		const supabaseAnonKey = this.configService.get<string>('SUPABASE_ANON_KEY')!;
		const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_KEY');

		// Regular client (respects RLS)
		this.supabase = createClient(supabaseUrl, supabaseAnonKey);

		// Admin client (bypasses RLS) - use for server-side operations
		if (supabaseServiceKey) {
			this.supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
		} else {
			this.supabaseAdmin = this.supabase;
		}
	}

	async onModuleInit() {
		await this.ensureProfilesTableExists();
	}

	/**
	 * Ensures the profiles table exists in the database
	 */
	private async ensureProfilesTableExists() {
		try {
			// Check if profiles table exists by trying to query it
			const { error } = await this.supabaseAdmin.from('profiles').select('id').limit(1);

			if (error && error.message.includes('does not exist')) {
				this.logger.warn('Profiles table not found, creating it...');
				await this.createProfilesTable();
			} else if (error && error.message.includes('schema cache')) {
				this.logger.warn('Profiles table not in schema cache, creating it...');
				await this.createProfilesTable();
			} else if (error) {
				this.logger.error('Error checking profiles table:', error.message);
			} else {
				this.logger.log('Profiles table exists');
			}
		} catch (err) {
			this.logger.error('Failed to check/create profiles table:', err);
		}
	}

	/**
	 * Creates the profiles table using raw SQL
	 */
	private async createProfilesTable() {
		const sql = `
			CREATE TABLE IF NOT EXISTS public.profiles (
				id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
				username TEXT UNIQUE,
				full_name TEXT,
				website TEXT,
				avatar_url TEXT,
				updated_at TIMESTAMPTZ DEFAULT NOW(),
				created_at TIMESTAMPTZ DEFAULT NOW()
			);

			ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

			DO $$
			BEGIN
				IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Service role can access all profiles') THEN
					CREATE POLICY "Service role can access all profiles" ON public.profiles FOR ALL USING (true);
				END IF;
			END $$;
		`;

		const { error } = await this.supabaseAdmin.rpc('exec_sql', { sql_query: sql });

		if (error) {
			// If RPC doesn't exist, log instructions
			this.logger.error('Could not auto-create profiles table:', error.message);
			this.logger.warn(
				'Please run the SQL migration manually in your Supabase dashboard. ' +
					'See: apps/api/supabase/migrations/001_create_profiles_table.sql',
			);
		} else {
			this.logger.log('Profiles table created successfully');
		}
	}

	/**
	 * Get the regular Supabase client (respects RLS)
	 */
	getClient(): SupabaseClient {
		return this.supabase;
	}

	/**
	 * Get the admin Supabase client (bypasses RLS)
	 * Use this for server-side operations that need elevated privileges
	 */
	getAdminClient(): SupabaseClient {
		return this.supabaseAdmin;
	}

	/**
	 * Create a Supabase client with a user's JWT for row-level security
	 */
	getClientWithAuth(jwt: string): SupabaseClient {
		const supabaseUrl = this.configService.get<string>('SUPABASE_URL')!;
		const supabaseAnonKey = this.configService.get<string>('SUPABASE_ANON_KEY')!;

		return createClient(supabaseUrl, supabaseAnonKey, {
			global: {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			}
		});
	}
}
