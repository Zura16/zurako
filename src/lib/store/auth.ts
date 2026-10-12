import type { SupabaseClient, User } from "@supabase/supabase-js";

export type Account = { userId: string; email: string | null; isGuest: boolean; remote: boolean };

export const LOCAL_ACCOUNT: Account = { userId: "local", email: null, isGuest: true, remote: false };

const toAccount = (u: User): Account => ({ userId: u.id, email: u.email ?? null, isGuest: u.is_anonymous ?? !u.email, remote: true });

/** Resume the current session, or start a guest (anonymous) one. */
export async function ensureSession(client: SupabaseClient): Promise<Account> {
  const { data } = await client.auth.getSession();
  if (data.session?.user) return toAccount(data.session.user);
  const { data: anon, error } = await client.auth.signInAnonymously();
  if (error || !anon.user) throw new Error(error?.message ?? "Could not start a guest session.");
  return toAccount(anon.user);
}

/**
 * "save": attach an email to the current guest account, keeping its progress.
 * "signin": sign in to an existing account on this device.
 */
export type CodeMode = "save" | "signin";

export async function requestCode(client: SupabaseClient, email: string, mode: CodeMode): Promise<void> {
  const emailRedirectTo = typeof window !== "undefined" ? window.location.origin + window.location.pathname : undefined;
  const { error } =
    mode === "save"
      ? await client.auth.updateUser({ email }, { emailRedirectTo })
      : await client.auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo } });
  if (error) throw new Error(friendlyAuthError(error.message, mode));
}

export async function verifyCode(client: SupabaseClient, email: string, token: string, mode: CodeMode): Promise<Account> {
  const { data, error } = await client.auth.verifyOtp({ email, token, type: mode === "save" ? "email_change" : "email" });
  if (error || !data.user) throw new Error(friendlyAuthError(error?.message ?? "That code didn't work.", mode));
  return toAccount(data.user);
}

export async function signOut(client: SupabaseClient): Promise<void> {
  await client.auth.signOut();
}

function friendlyAuthError(message: string, mode: CodeMode): string {
  const m = message.toLowerCase();
  if (m.includes("already") && mode === "save") return "That email already has an account. Use Sign in instead.";
  if (m.includes("signups not allowed") || m.includes("user not found")) return "No account uses that email yet. Save your progress first.";
  if (m.includes("rate limit") || m.includes("security purposes")) return "Too many emails were sent. Wait a few minutes and try again.";
  if (m.includes("expired") || m.includes("invalid")) return "That code is wrong or expired.";
  return message;
}
