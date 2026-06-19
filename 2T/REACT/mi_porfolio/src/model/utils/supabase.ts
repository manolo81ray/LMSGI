import { createClient } from '@supabase/supabase-js'

// Extraccion de las variables de supbase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Realiza la conexion de Supabase con la URL y la ApiKey
export const supabase = createClient(supabaseUrl, supabaseKey);
