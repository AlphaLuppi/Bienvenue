import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SERVICE_FQDN_SUPABASEKONG || ''
const supabaseKey = process.env.SERVICE_SUPABASEANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)