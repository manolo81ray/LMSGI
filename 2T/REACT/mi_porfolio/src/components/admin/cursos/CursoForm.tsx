import { useForm, type SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"
import { FileTextIcon, ImageIcon, PlusIcon, SaveIcon, SlidersHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormSection } from "@/components/admin/shared/FormSection"
import { insertCurso, updateCurso } from "@/model/api/backend/cursos/apiCursos"
import type { ICursos } from "@/model/interfaces/formacion/ICursos"

type CursoFormValues = Omit<ICursos, "id" | "etiquetas" | "fecha" | "fecha_fin"> & {
    etiquetas: string
    fecha: string
    fecha_fin: string
}

interface CursoFormProps extends React.HTMLAttributes<HTMLDivElement> {
    curso?: ICursos
    onSaved?: () => void
}

export const CursoForm = ({ className, curso, onSaved, ...props }: CursoFormProps) => {
    const isEditing = Boolean(curso)
    const [submitting, setSubmitting] = useState(false)

    const buildDefaults = (c?: ICursos): CursoFormValues => ({
        titulo: c?.titulo ?? "",
        descripcion: c?.descripcion ?? "",
        plataforma: c?.plataforma ?? "",
        imagen: c?.imagen ?? "",
        fecha: c?.fecha ? String(c.fecha).split("T")[0] : "",
        fecha_fin: c?.fecha_fin ? String(c.fecha_fin).split("T")[0] : "",
        etiquetas: c?.etiquetas?.join(", ") ?? "",
        precio: c?.precio ?? 0,
        impartido: c?.impartido ?? "",
        visible: c?.visible ?? true,
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
            etiquetas: data.etiquetas.split(",").map((e) => e.trim()).filter(Boolean),
            fecha_fin: data.fecha_fin || null,
        } as unknown as Omit<ICursos, "id">
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
                <FormSection title={isEditing ? "Editando fila" : "Nueva fila"} icon={<FileTextIcon />} accent="indigo">
                    <div className="grid gap-2">
                        <Label htmlFor="titulo">Titulo del curso</Label>
                        <Input id="titulo" type="text" placeholder="Ej: React Moderno" aria-invalid={Boolean(errors.titulo)} {...register("titulo", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="descripcion">Descripcion</Label>
                        <Textarea id="descripcion" placeholder="Resumen del contenido del curso" aria-invalid={Boolean(errors.descripcion)} {...register("descripcion", { required: true })} />
                    </div>
                </FormSection>

                <FormSection title="Detalles" icon={<SlidersHorizontalIcon />} accent="teal">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="plataforma">Plataforma</Label>
                            <Input id="plataforma" type="text" placeholder="Ej: Udemy" aria-invalid={Boolean(errors.plataforma)} {...register("plataforma", { required: true })} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="precio">Precio (€)</Label>
                            <Input id="precio" type="number" step="0.01" placeholder="49.99" aria-invalid={Boolean(errors.precio)} {...register("precio", { required: true, valueAsNumber: true })} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="fecha">Fecha de inicio</Label>
                            <Input id="fecha" type="date" aria-invalid={Boolean(errors.fecha)} {...register("fecha", { required: true })} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="fecha_fin">Fecha de fin (opcional)</Label>
                            <Input id="fecha_fin" type="date" {...register("fecha_fin")} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="impartido">Impartido por (opcional)</Label>
                        <Input id="impartido" type="text" placeholder="Ej: Antonio Sanchez" {...register("impartido")} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="etiquetas">Etiquetas (separadas por comas)</Label>
                        <Input id="etiquetas" type="text" placeholder="Ej: React, Hooks, Redux" {...register("etiquetas")} />
                    </div>
                </FormSection>

                <FormSection title="Medios" icon={<ImageIcon />} accent="gold">
                    <div className="grid gap-2">
                        <Label htmlFor="imagen">URL de la imagen (opcional)</Label>
                        <Input id="imagen" type="url" placeholder="https://..." {...register("imagen")} />
                    </div>
                </FormSection>

                <div className="mt-1 border-t border-border pt-4">
                    <Button type="submit" className="w-full" disabled={submitting}>
                        {isEditing ? <SaveIcon /> : <PlusIcon />}
                        {submitting ? "Guardando..." : isEditing ? "Guardar cambios" : "Anadir curso"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
