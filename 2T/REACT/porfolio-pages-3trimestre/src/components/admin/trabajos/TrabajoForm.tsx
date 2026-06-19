import { useForm, type SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { insertTrabajo, updateTrabajo } from "@/model/api/backend/apiTrabajos"
import type { ITrabajo } from "@/model/interfaces/ITrabajo"

type TrabajoFormValues = Omit<ITrabajo, "id" | "tecnologias"> & {
    tecnologias: string
}

interface TrabajoFormProps extends React.HTMLAttributes<HTMLDivElement> {
    trabajo?: ITrabajo
    onSaved?: () => void
}

export const TrabajoForm = ({ className, trabajo, onSaved, ...props }: TrabajoFormProps) => {
    const isEditing = Boolean(trabajo)
    const [submitting, setSubmitting] = useState(false)

    const buildDefaults = (t?: ITrabajo): TrabajoFormValues => ({
        titulo: t?.titulo ?? "",
        descripcion: t?.descripcion ?? "",
        imagen: t?.imagen ?? "",
        enlace: t?.enlace ?? "",
        tecnologias: t?.tecnologias?.join(", ") ?? "",
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TrabajoFormValues>({
        defaultValues: buildDefaults(trabajo),
    })

    useEffect(() => {
        reset(buildDefaults(trabajo))
    }, [trabajo, reset])

    const enviarDatos: SubmitHandler<TrabajoFormValues> = async (data) => {
        setSubmitting(true)
        const payload = {
            ...data,
            tecnologias: data.tecnologias
                .split(",")
                .map((tecnologia) => tecnologia.trim())
                .filter(Boolean),
        }
        const ok = isEditing && trabajo
            ? await updateTrabajo(trabajo.id, payload)
            : await insertTrabajo(payload)
        setSubmitting(false)

        if (ok) {
            if (!isEditing) reset(buildDefaults())
            onSaved?.()
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(enviarDatos)} className="flex flex-col gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="titulo">Titulo del proyecto</Label>
                    <Input
                        id="titulo"
                        type="text"
                        placeholder="Ej: Portfolio personal"
                        aria-invalid={Boolean(errors.titulo)}
                        {...register("titulo", { required: true })}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="descripcion">Descripcion</Label>
                    <Textarea
                        id="descripcion"
                        className="min-h-32"
                        placeholder="Describe el proyecto realizado"
                        aria-invalid={Boolean(errors.descripcion)}
                        {...register("descripcion", { required: true })}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="imagen">URL de la imagen</Label>
                    <Input
                        id="imagen"
                        type="url"
                        placeholder="https://..."
                        aria-invalid={Boolean(errors.imagen)}
                        {...register("imagen", { required: true })}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="enlace">Enlace al proyecto</Label>
                    <Input
                        id="enlace"
                        type="url"
                        placeholder="https://..."
                        {...register("enlace")}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="tecnologias">Tecnologias (separadas por comas)</Label>
                    <Input
                        id="tecnologias"
                        type="text"
                        placeholder="Ej: React, TypeScript, Tailwind"
                        {...register("tecnologias")}
                    />
                </div>

                <Button type="submit" className="mt-2 w-full" disabled={submitting}>
                    {submitting ? "Guardando..." : isEditing ? "Guardar cambios" : "Anadir trabajo"}
                </Button>
            </form>
        </div>
    )
}
