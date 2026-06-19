import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

//esta variable es la que realiza la conexion a supabse (con la URL y la apikey)
export const supabase = createClient(supabaseUrl, supabaseKey);