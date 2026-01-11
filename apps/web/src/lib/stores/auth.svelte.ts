import type { Session, User, SupabaseClient } from '@supabase/supabase-js'
import { browser } from '$app/environment'
import { invalidate } from '$app/navigation'

interface AuthState {
	session: Session | null
	user: User | null
	isLoading: boolean
	supabase: SupabaseClient | null
}

class AuthStore {
	private state = $state<AuthState>({
		session: null,
		user: null,
		isLoading: true,
		supabase: null
	})

	constructor() {
		// Initialize auth state from browser if available
		if (browser && this.state.supabase) {
			this.initializeAuth()
		}
	}

	// Getters reactifs avec $derived
	get session() {
		return this.state.session
	}

	get user() {
		return this.state.user
	}

	get isLoading() {
		return this.state.isLoading
	}

	get isAuthenticated() {
		return !!this.state.session && !!this.state.user
	}

	get supabase() {
		return this.state.supabase
	}

	// Méthodes pour mettre à jour l'état
	setSupabase(supabase: SupabaseClient) {
		this.state.supabase = supabase
		if (browser) {
			this.initializeAuth()
		}
	}

	setSession(session: Session | null, user: User | null = null) {
		this.state.session = session
		this.state.user = user
		this.state.isLoading = false
	}

	setLoading(loading: boolean) {
		this.state.isLoading = loading
	}

	private async initializeAuth() {
		if (!this.state.supabase) return

		try {
			// Écouter les changements d'authentification
			this.state.supabase.auth.onAuthStateChange(async (event, session) => {
				console.log('Auth state changed:', event, session?.user?.id)

				if (session?.expires_at !== this.state.session?.expires_at) {
					if (session?.user && !this.state.user) {
						// Nouvelle session
						this.setSession(session, session.user)
					} else if (!session?.user && this.state.user) {
						// Déconnexion
						this.setSession(null, null)
					} else {
						// Mise à jour de session
						this.setSession(session, session?.user || null)
					}

					// Invalider les données dépendantes de l'auth
					await invalidate('supabase:auth')
				}
			})

			// Récupérer la session actuelle
			const { data: { session }, error } = await this.state.supabase.auth.getSession()
			if (!error && session) {
				this.setSession(session, session.user)
			} else {
				this.setLoading(false)
			}
		} catch (error) {
			console.error('Error initializing auth:', error)
			this.setLoading(false)
		}
	}

	// Méthodes d'authentification
	async signIn(email: string, password: string) {
		if (!this.state.supabase) throw new Error('Supabase not initialized')

		this.setLoading(true)

		const { data, error } = await this.state.supabase.auth.signInWithPassword({
			email,
			password
		})

		if (error) {
			this.setLoading(false)
			throw error
		}

		return data
	}

	async signUp(email: string, password: string, metadata: Record<string, any> = {}) {
		if (!this.state.supabase) throw new Error('Supabase not initialized')

		this.setLoading(true)

		const { data, error } = await this.state.supabase.auth.signUp({
			email,
			password,
			options: {
				data: metadata
			}
		})

		if (error) {
			this.setLoading(false)
			throw error
		}

		return data
	}

	async signOut() {
		if (!this.state.supabase) throw new Error('Supabase not initialized')

		this.setLoading(true)

		const { error } = await this.state.supabase.auth.signOut()

		if (error) {
			this.setLoading(false)
			throw error
		}

		this.setSession(null, null)
	}

	async resetPassword(email: string) {
		if (!this.state.supabase) throw new Error('Supabase not initialized')

		const { error } = await this.state.supabase.auth.resetPasswordForEmail(email)

		if (error) throw error
	}

	async updateProfile(updates: Record<string, any>) {
		if (!this.state.supabase) throw new Error('Supabase not initialized')
		if (!this.state.user) throw new Error('No user logged in')

		const { data, error } = await this.state.supabase.auth.updateUser({
			data: updates
		})

		if (error) throw error

		return data
	}
}

// Export du store singleton
export const authStore = new AuthStore()

// Fonction utilitaire pour initialiser le store avec Supabase
export function initializeAuthStore(supabase: SupabaseClient) {
	authStore.setSupabase(supabase)
}