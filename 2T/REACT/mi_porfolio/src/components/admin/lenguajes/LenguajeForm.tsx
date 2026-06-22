import { useForm, type SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"
import { CodeIcon, PlusIcon, SaveIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormSection } from "@/components/admin/shared/FormSection"
import { insertLenguaje, updateLenguaje } from "@/model/api/backend/lenguajes/apiLenguajes"
import type { ILenguajes } from "@/model/interfaces/home/ILenguajes"

type LenguajeFormValues = Omit<ILenguajes, "id_lenguaje">

interface LenguajeFormProps extends React.HTMLAttributes<HTMLDivElement> {
    lenguaje?: ILenguajes
    onSaved?: () => void
}

export const LenguajeForm = ({ className, lenguaje, onSaved, ...props }: LenguajeFormProps) => {
    const isEditing = Boolean(lenguaje)
    const [submitting, setSubmitting] = useState(false)

    const buildDefaults = (l?: ILenguajes): LenguajeFormValues => ({
        logo: l?.logo ?? "",
        nombre: l?.nombre ?? "",
        visible: l?.visible ?? true,
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<LenguajeFormValues>({
        defaultValues: buildDefaults(lenguaje),
    })

    useEffect(() => {
        reset(buildDefaults(lenguaje))
    }, [lenguaje, reset])

    const enviarDatos: SubmitHandler<LenguajeFormValues> = async (data) => {
        setSubmitting(true)
        const ok = isEditing && lenguaje
            ? await updateLenguaje(lenguaje.id_lenguaje, data)
            : await insertLenguaje(data)
        setSubmitting(false)
        if (ok) {
            if (!isEditing) reset(buildDefaults())
            onSaved?.()
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(enviarDatos)} className="flex flex-col gap-4">
                <FormSection title={isEditing ? "Editando fila" : "Nueva fila"} icon={<CodeIcon />} accent="indigo">
                    <div className="grid gap-2">
                        <Label htmlFor="logo">URL del logo</Label>
                        <Input id="logo" type="url" placeholder="https://..." aria-invalid={Boolean(errors.logo)} {...register("logo", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="nombre">Nombre (opcional)</Label>
                        <Input id="nombre" type="text" placeholder="Ej: TypeScript" {...register("nombre")} />
                    </div>
                </FormSection>

                <div className="mt-1 border-t border-border pt-4">
                    <Button type="submit" className="w-full" disabled={submitting}>
                        {isEditing ? <SaveIcon /> : <PlusIcon />}
                        {submitting ? "Guardando..." : isEditing ? "Guardar cambios" : "Anadir lenguaje"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
