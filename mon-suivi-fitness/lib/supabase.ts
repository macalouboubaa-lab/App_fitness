import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

export interface SupabaseUser {
  id?: string;
  slug: string;
  display_name: string;
  created_at?: string;
  last_seen?: string;
}

export interface SupabaseProgress {
  id?: string;
  user_slug: string;
  exercise_id: string;
  completed: boolean;
  updated_at?: string;
}

export async function upsertUser(slug: string, displayName: string) {
  if (!isSupabaseConfigured()) return { error: "Supabase non configuré" };

  const { data, error } = await supabase
    .from("users")
    .upsert(
      {
        slug,
        display_name: displayName,
        last_seen: new Date().toISOString(),
      },
      { onConflict: "slug" }
    )
    .select()
    .single();

  return { data, error };
}

export async function fetchUserProgress(slug: string) {
  if (!isSupabaseConfigured()) return { data: [], error: null };

  const { data, error } = await supabase
    .from("progress")
    .select("exercise_id, completed")
    .eq("user_slug", slug)
    .eq("completed", true);

  return { data: data || [], error };
}

export async function saveExerciseCompletion(
  slug: string,
  exerciseId: string,
  completed: boolean
) {
  if (!isSupabaseConfigured()) return { error: "Supabase non configuré" };

  const { data, error } = await supabase
    .from("progress")
    .upsert(
      {
        user_slug: slug,
        exercise_id: exerciseId,
        completed,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_slug,exercise_id" }
    )
    .select();

  return { data, error };
}

export async function fetchAllUsers() {
  if (!isSupabaseConfigured()) return { data: [], error: null };

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("last_seen", { ascending: false });

  return { data: data || [], error };
}

export async function fetchAllProgress() {
  if (!isSupabaseConfigured()) return { data: [], error: null };

  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("completed", true);

  return { data: data || [], error };
}

export async function deleteUser(slug: string) {
  if (!isSupabaseConfigured()) return { error: "Supabase non configuré" };

  const { error } = await supabase.from("users").delete().eq("slug", slug);

  return { error };
}