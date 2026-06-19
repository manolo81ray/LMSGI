import { useForm, type SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"
import { FileTextIcon, LinkIcon, PlusIcon, SaveIcon, TagsIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormSection } from "@/components/admin/shared/FormSection"
import { insertProyecto, updateProyecto } from "@/model/api/backend/proyectos/apiProyectos"
import type { IProyectos } from "@/model/interfaces/proyectos/IProyectos"

type ProyectoFormValues = Omit<IProyectos, "id" | "etiquetas" | "fecha_creacion"> & {
    etiquetas: string
    fecha_creacion: string
}

interface ProyectoFormProps extends React.HTMLAttributes<HTMLDivElement> {
    proyecto?: IProyectos
    onSaved?: () => void
}

export const ProyectoForm = ({ className, proyecto, onSaved, ...props }: ProyectoFormProps) => {
    const isEditing = Boolean(proyecto)
    const [submitting, setSubmitting] = useState(false)

    const buildDefaults = (p?: IProyectos): ProyectoFormValues => ({
        titulo: p?.titulo ?? "",
        descripcion: p?.descripcion ?? "",
        tecnologia: p?.tecnologia ?? "",
        etiquetas: p?.etiquetas?.join(", ") ?? "",
        url: p?.url ?? "",
        img_web: p?.img_web ?? "",
        fecha_creacion: p?.fecha_creacion ? String(p.fecha_creacion).split("T")[0] : "",
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProyectoFormValues>({
        defaultValues: buildDefaults(proyecto),
    })

    useEffect(() => {
        reset(buildDefaults(proyecto))
    }, [proyecto, reset])

    const enviarDatos: SubmitHandler<ProyectoFormValues> = async (data) => {
        setSubmitting(true)
        const payload = {
            ...data,
            url: data.url || null,
            etiquetas: data.etiquetas.split(",").map((e) => e.trim()).filter(Boolean),
        } as unknown as Omit<IProyectos, "id">
        const ok = isEditing && proyecto
            ? await updateProyecto(proyecto.id, payload)
            : await insertProyecto(payload)
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
                        <Label htmlFor="titulo">Titulo del proyecto</Label>
                        <Input id="titulo" type="text" placeholder="Ej: Portfolio personal" aria-invalid={Boolean(errors.titulo)} {...register("titulo", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="descripcion">Descripcion</Label>
                        <Textarea id="descripcion" className="min-h-32" placeholder="Describe el proyecto realizado" aria-invalid={Boolean(errors.descripcion)} {...register("descripcion", { required: true })} />
                    </div>
                </FormSection>

                <FormSection title="Detalles" icon={<TagsIcon />} accent="teal">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="tecnologia">Tecnologia principal</Label>
                            <Input id="tecnologia" type="text" placeholder="Ej: React" aria-invalid={Boolean(errors.tecnologia)} {...register("tecnologia", { required: true })} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="fecha_creacion">Fecha de creacion</Label>
                            <Input id="fecha_creacion" type="date" aria-invalid={Boolean(errors.fecha_creacion)} {...register("fecha_creacion", { required: true })} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="etiquetas">Etiquetas (separadas por comas)</Label>
                        <Input id="etiquetas" type="text" placeholder="Ej: React, TypeScript, Tailwind" {...register("etiquetas")} />
                    </div>
                </FormSection>

                <FormSection title="Enlaces y medios" icon={<LinkIcon />} accent="gold">
                    <div className="grid gap-2">
                        <Label htmlFor="img_web">URL de la imagen</Label>
                        <Input id="img_web" type="url" placeholder="https://..." aria-invalid={Boolean(errors.img_web)} {...register("img_web", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="url">Enlace al proyecto (opcional)</Label>
                        <Input id="url" type="url" placeholder="https://..." {...register("url")} />
                    </div>
                </FormSection>

                <div className="mt-1 border-t border-border pt-4">
                    <Button type="submit" className="w-full" disabled={submitting}>
                        {isEditing ? <SaveIcon /> : <PlusIcon />}
                        {submitting ? "Guardando..." : isEditing ? "Guardar cambios" : "Anadir proyecto"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
