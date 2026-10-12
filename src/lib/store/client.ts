import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * The Supabase client, or null when the build has no Supabase settings. In
 * that case the app runs in device-only mode and says so in the UI.
 */
let client: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  client = url && key ? createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }) : null;
  return client;
}
