import { useForm, type SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"
import { BuildingIcon, CalendarRangeIcon, FileTextIcon, PlusIcon, SaveIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormSection } from "@/components/admin/shared/FormSection"
import { insertFormacion, updateFormacion } from "@/model/api/backend/formacion/apiFormacion"
import type { IFormacion } from "@/model/interfaces/formacion/IFormacion"

type FormacionFormValues = Omit<IFormacion, "id" | "fecha_inicio" | "fecha_fin"> & {
    fecha_inicio: string
    fecha_fin: string
}

interface FormacionFormProps extends React.HTMLAttributes<HTMLDivElement> {
    formacion?: IFormacion
    onSaved?: () => void
}

export const FormacionForm = ({ className, formacion, onSaved, ...props }: FormacionFormProps) => {
    const isEditing = Boolean(formacion)
    const [submitting, setSubmitting] = useState(false)

    const buildDefaults = (f?: IFormacion): FormacionFormValues => ({
        tipo: f?.tipo ?? "",
        nombre: f?.nombre ?? "",
        fecha_inicio: f?.fecha_inicio ? String(f.fecha_inicio).split("T")[0] : "",
        fecha_fin: f?.fecha_fin ? String(f.fecha_fin).split("T")[0] : "",
        descripcion: f?.descripcion ?? "",
        imagen: f?.imagen ?? "",
        institucion: f?.institucion ?? "",
        lugar_institucion: f?.lugar_institucion ?? "",
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormacionFormValues>({
        defaultValues: buildDefaults(formacion),
    })

    useEffect(() => {
        reset(buildDefaults(formacion))
    }, [formacion, reset])

    const enviarDatos: SubmitHandler<FormacionFormValues> = async (data) => {
        setSubmitting(true)
        const ok = isEditing && formacion
            ? await updateFormacion(formacion.id, data)
            : await insertFormacion(data)
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="tipo">Tipo</Label>
                            <Input id="tipo" type="text" placeholder="Ej: Grado Superior" aria-invalid={Boolean(errors.tipo)} {...register("tipo", { required: true })} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input id="nombre" type="text" placeholder="Ej: Administracion de Sistemas" aria-invalid={Boolean(errors.nombre)} {...register("nombre", { required: true })} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="descripcion">Descripcion</Label>
                        <Textarea id="descripcion" className="min-h-28" placeholder="Breve descripcion de los estudios" aria-invalid={Boolean(errors.descripcion)} {...register("descripcion", { required: true })} />
                    </div>
                </FormSection>

                <FormSection title="Periodo" icon={<CalendarRangeIcon />} accent="teal">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="fecha_inicio">Fecha de inicio</Label>
                            <Input id="fecha_inicio" type="date" aria-invalid={Boolean(errors.fecha_inicio)} {...register("fecha_inicio", { required: true })} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="fecha_fin">Fecha de fin</Label>
                            <Input id="fecha_fin" type="date" aria-invalid={Boolean(errors.fecha_fin)} {...register("fecha_fin", { required: true })} />
                        </div>
                    </div>
                </FormSection>

                <FormSection title="Institucion" icon={<BuildingIcon />} accent="gold">
                    <div className="grid gap-2">
                        <Label htmlFor="institucion">Institucion</Label>
                        <Input id="institucion" type="text" placeholder="Ej: IES La Arboleda" aria-invalid={Boolean(errors.institucion)} {...register("institucion", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lugar_institucion">Lugar</Label>
                        <Input id="lugar_institucion" type="text" placeholder="Ej: Sevilla, Espana" aria-invalid={Boolean(errors.lugar_institucion)} {...register("lugar_institucion", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="imagen">URL de la imagen / logo</Label>
                        <Input id="imagen" type="url" placeholder="https://..." aria-invalid={Boolean(errors.imagen)} {...register("imagen", { required: true })} />
                    </div>
                </FormSection>

                <div className="mt-1 border-t border-border pt-4">
                    <Button type="submit" className="w-full" disabled={submitting}>
                        {isEditing ? <SaveIcon /> : <PlusIcon />}
                        {submitting ? "Guardando..." : isEditing ? "Guardar cambios" : "Anadir formacion"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
