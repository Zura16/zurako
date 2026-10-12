import type { SupabaseClient, User } from "@supabase/supabase-js";

export type Account = { userId: string; email: string | null; isGuest: boolean; remote: boolean };

export const LOCAL_ACCOUNT: Account = { userId: "local", email: null, isGuest: true, remote: false };

export const toAccount = (u: User): Account => ({
  userId: u.id,
  email: u.email ?? null,
  isGuest: u.is_anonymous ?? !u.email,
  remote: true,
});

/** Resume the current session (including one arriving via an email link), or start a guest session. */
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
 * Both send an email with a link; opening it completes the step.
 */
export type LinkMode = "save" | "signin";

export async function sendEmailLink(client: SupabaseClient, email: string, mode: LinkMode): Promise<void> {
  const emailRedirectTo = window.location.origin + window.location.pathname;
  const { error } =
    mode === "save"
      ? await client.auth.updateUser({ email }, { emailRedirectTo })
      : await client.auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo } });
  if (error) throw new Error(friendlyAuthError(error.message, mode));
}

export async function signOut(client: SupabaseClient): Promise<void> {
  await client.auth.signOut();
}

function friendlyAuthError(message: string, mode: LinkMode): string {
  const m = message.toLowerCase();
  if (m.includes("already") && mode === "save") return "That email already has an account. Use Sign in instead.";
  if (m.includes("signups not allowed") || m.includes("user not found")) return "No account uses that email yet. Save your progress first.";
  if (m.includes("rate limit") || m.includes("security purposes")) return "Too many emails were sent. Wait a few minutes and try again.";
  return message;
}
