import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aoxymntjgiwbizcojqbl.supabase.co";
const supabaseAnonKey = "sb_publishable_uany-6lIT2neNgm5z2okoA_JGA9QAkm";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
