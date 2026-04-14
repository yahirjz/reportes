import { createClient } from "@supabase/supabase-js";
import { Data } from "./types";

//creamos la conexion a supabase
export const supabase = createClient<Data>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
);

