import { useForm, type SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"
import { CoinsIcon, FileTextIcon, PlusIcon, SaveIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormSection } from "@/components/admin/shared/FormSection"
import { insertServicio, updateServicio } from "@/model/api/backend/servicios/apiServicios"
import type { IServicios } from "@/model/interfaces/servicios/IServicios"

type ServicioFormValues = Omit<IServicios, "id">

interface ServicioFormProps extends React.HTMLAttributes<HTMLDivElement> {
    servicio?: IServicios
    onSaved?: () => void
}

export const ServicioForm = ({ className, servicio, onSaved, ...props }: ServicioFormProps) => {
    const isEditing = Boolean(servicio)
    const [submitting, setSubmitting] = useState(false)

    const buildDefaults = (s?: IServicios): ServicioFormValues => ({
        nombre: s?.nombre ?? "",
        tipo: s?.tipo ?? "",
        descripcion: s?.descripcion ?? "",
        imagen: s?.imagen ?? "",
        precio: s?.precio ?? 0,
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ServicioFormValues>({
        defaultValues: buildDefaults(servicio),
    })

    useEffect(() => {
        reset(buildDefaults(servicio))
    }, [servicio, reset])

    const enviarDatos: SubmitHandler<ServicioFormValues> = async (data) => {
        setSubmitting(true)
        const ok = isEditing && servicio
            ? await updateServicio(servicio.id, data)
            : await insertServicio(data)
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
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" type="text" placeholder="Ej: Diseno y Desarrollo Web" aria-invalid={Boolean(errors.nombre)} {...register("nombre", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="tipo">Tipo</Label>
                        <Input id="tipo" type="text" placeholder="Ej: Desarrollo Web" aria-invalid={Boolean(errors.tipo)} {...register("tipo", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="descripcion">Descripcion</Label>
                        <Textarea id="descripcion" className="min-h-32" placeholder="Descripcion del servicio" aria-invalid={Boolean(errors.descripcion)} {...register("descripcion", { required: true })} />
                    </div>
                </FormSection>

                <FormSection title="Precio y medios" icon={<CoinsIcon />} accent="teal">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="precio">Precio (€)</Label>
                            <Input id="precio" type="number" step="0.01" placeholder="Ej: 250.00" aria-invalid={Boolean(errors.precio)} {...register("precio", { required: true, valueAsNumber: true })} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="imagen">URL de la imagen</Label>
                            <Input id="imagen" type="url" placeholder="https://..." {...register("imagen")} />
                        </div>
                    </div>
                </FormSection>

                <div className="mt-1 border-t border-border pt-4">
                    <Button type="submit" className="w-full" disabled={submitting}>
                        {isEditing ? <SaveIcon /> : <PlusIcon />}
                        {submitting ? "Guardando..." : isEditing ? "Guardar cambios" : "Anadir servicio"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
