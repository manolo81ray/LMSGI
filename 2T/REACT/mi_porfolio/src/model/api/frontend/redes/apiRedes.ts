import type { IRedSocial } from "@/model/interfaces/contacto/IRedSocial"
import { supabase } from "@/model/utils/supabase"

// Redes visibles para la web pública. El RLS ya filtra visible = true, pero
// ordenamos por `orden` para respetar la disposición elegida en el admin.
export const getRedes = async (): Promise<IRedSocial[]> => {
    const { data, error } = await supabase
        .from("redes_sociales")
        .select("*")
        .order("orden", { ascending: true })
        .order("id", { ascending: true })

    if (error) {
        console.error(error)
        return []
    }
    return (data ?? []) as IRedSocial[]
}
