import { createClient } from "@supabase/supabase-js";
import { Database } from "./generated/supabase";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided");
}
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
