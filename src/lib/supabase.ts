import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import type { LayoutLoad } from './$types'

export const createSupabaseLoadClient = (fetch: typeof globalThis.fetch) => {
	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch,
		},
		cookies: {
			get(key) {
				if (!isBrowser) return undefined

				const cookie = document.cookie
					.split('; ')
					.find(row => row.startsWith(`${key}=`))

				return cookie ? decodeURIComponent(cookie.split('=')[1]) : undefined
			},
			set(key, value, options) {
				if (!isBrowser) return

				let cookieString = `${key}=${encodeURIComponent(value)}`

				if (options?.maxAge) {
					cookieString += `; max-age=${options.maxAge}`
				}
				if (options?.path) {
					cookieString += `; path=${options.path}`
				}
				if (options?.domain) {
					cookieString += `; domain=${options.domain}`
				}
				if (options?.secure) {
					cookieString += '; secure'
				}
				if (options?.httpOnly) {
					cookieString += '; httponly'
				}
				if (options?.sameSite) {
					cookieString += `; samesite=${options.sameSite}`
				}

				document.cookie = cookieString
			},
			remove(key, options) {
				if (!isBrowser) return

				let cookieString = `${key}=; max-age=0`

				if (options?.path) {
					cookieString += `; path=${options.path}`
				}
				if (options?.domain) {
					cookieString += `; domain=${options.domain}`
				}

				document.cookie = cookieString
			}
		}
	})

	return supabase
}

export const createSupabaseServerClient = (fetch: typeof globalThis.fetch, cookies: any) => {
	return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: { fetch },
		cookies: {
			get: (key: string) => cookies.get(key),
			set: (key: string, value: string, options: any) => cookies.set(key, value, { ...options, path: '/' }),
			remove: (key: string, options: any) => cookies.delete(key, { ...options, path: '/' })
		}
	})
}

// Client simple pour les composants côté client
export const createSupabaseClient = () => {
	return createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
}