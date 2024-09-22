import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@latest";

export function createSupabaseClient(token: string): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL") || "",
    Deno.env.get("SUPABASE_ANON_KEY") || "",
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );
}

export async function authenticateUser(req: Request): Promise<{ user: any, error: string | null, supabase: SupabaseClient }> {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "") || "";
  const supabase = createSupabaseClient(token);

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    return { user: null, error: error.message, supabase };
  }

  if (!user) {
    return { user: null, error: "Unauthorized", supabase };
  }

  return { user, error: null, supabase };
}