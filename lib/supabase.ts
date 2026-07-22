import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Don't crash the app in local/dev if Supabase hasn't been configured yet —
  // just warn loudly so it's obvious logging is disabled.
  console.warn(
    "[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Calculation logging is disabled until these are set in your environment."
  );
}

export { supabase };

/**
 * Shape of a row in the `age_calculations` table.
 * Run the SQL in README.md to create this table in your Supabase project.
 */
export interface AgeCalculationLog {
  birth_date: string; // ISO date string, e.g. "1998-04-23"
  years: number;
  months: number;
  days: number;
}

/**
 * Logs a single calculation to Supabase. Fails silently (with a console warning)
 * if Supabase isn't configured, so the calculator still works without a database.
 */
export async function logAgeCalculation(entry: AgeCalculationLog) {
  if (!supabase) return { data: null, error: null };

  const { data, error } = await supabase
    .from("age_calculations")
    .insert([entry])
    .select()
    .single();

  if (error) {
    console.error("[supabase] Failed to log calculation:", error.message);
  }

  return { data, error };
}
