import { useForm, type SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { insertCurso, updateCurso } from "@/model/api/backend/apiCursos"
import type { ICurso } from "@/model/interfaces/ICurso"

// Igual que ICurso pero con "etiquetas" como texto separado por comas,
// que es como se edita en el formulario.
type CursoFormValues = Omit<ICurso, "id" | "etiquetas"> & {
    etiquetas: string
}

interface CursoFormProps extends React.HTMLAttributes<HTMLDivElement> {
    curso?: ICurso
    onSaved?: () => void
}

export const CursoForm = ({ className, curso, onSaved, ...props }: CursoFormProps) => {
    const isEditing = Boolean(curso)
    const [submitting, setSubmitting] = useState(false)

    const buildDefaults = (c?: ICurso): CursoFormValues => ({
        titulo: c?.titulo ?? "",
        descripcion: c?.descripcion ?? "",
        plataforma: c?.plataforma ?? "",
        imagen: c?.imagen ?? "",
        fecha: c?.fecha ?? "",
        etiquetas: c?.etiquetas?.join(", ") ?? "",
        precio: c?.precio ?? 0,
        impartido: c?.impartido ?? "",
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CursoFormValues>({
        defaultValues: buildDefaults(curso),
    })

    useEffect(() => {
        reset(buildDefaults(curso))
    }, [curso, reset])

    const enviarDatos: SubmitHandler<CursoFormValues> = async (data) => {
        setSubmitting(true)
        const payload = {
            ...data,
            imagen: data.imagen || null,
            impartido: data.impartido || null,
            etiquetas: data.etiquetas
                .split(",")
                .map((etiqueta) => etiqueta.trim())
                .filter(Boolean),
        }
        const ok = isEditing && curso
            ? await updateCurso(curso.id, payload)
            : await insertCurso(payload)
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
                    <Label htmlFor="titulo">Titulo del curso</Label>
                    <Input
                        id="titulo"
                        type="text"
                        placeholder="Ej: React Moderno"
                        aria-invalid={Boolean(errors.titulo)}
                        {...register("titulo", { required: true })}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="descripcion">Descripcion</Label>
                    <Textarea
                        id="descripcion"
                        placeholder="Resumen del contenido del curso"
                        aria-invalid={Boolean(errors.descripcion)}
                        {...register("descripcion", { required: true })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="plataforma">Plataforma</Label>
                        <Input
                            id="plataforma"
                            type="text"
                            placeholder="Ej: Udemy"
                            aria-invalid={Boolean(errors.plataforma)}
                            {...register("plataforma", { required: true })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="precio">Precio (€)</Label>
                        <Input
                            id="precio"
                            type="number"
                            step="0.01"
                            placeholder="Ej: 49.99"
                            aria-invalid={Boolean(errors.precio)}
                            {...register("precio", { required: true, valueAsNumber: true })}
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="fecha">Fecha</Label>
                    <Input
                        id="fecha"
                        type="date"
                        aria-invalid={Boolean(errors.fecha)}
                        {...register("fecha", { required: true })}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="imagen">URL de la imagen (opcional)</Label>
                    <Input
                        id="imagen"
                        type="url"
                        placeholder="https://..."
                        {...register("imagen")}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="impartido">Impartido por (opcional)</Label>
                    <Input
                        id="impartido"
                        type="text"
                        placeholder="Ej: Antonio Sanchez Corbalan"
                        {...register("impartido")}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="etiquetas">Etiquetas (separadas por comas)</Label>
                    <Input
                        id="etiquetas"
                        type="text"
                        placeholder="Ej: React, Hooks, Redux"
                        {...register("etiquetas")}
                    />
                </div>

                <Button type="submit" className="mt-2 w-full" disabled={submitting}>
                    {submitting ? "Guardando..." : isEditing ? "Guardar cambios" : "Anadir curso"}
                </Button>
            </form>
        </div>
    )
}
