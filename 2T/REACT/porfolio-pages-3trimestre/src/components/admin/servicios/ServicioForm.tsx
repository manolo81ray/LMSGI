import { useForm, type SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { insertServicio, updateServicio } from "@/model/api/backend/apiServicios"
import type { IServicioAdmin } from "@/model/interfaces/IServicioAdmin"

type ServicioFormValues = Omit<IServicioAdmin, "id">

interface ServicioFormProps extends React.HTMLAttributes<HTMLDivElement> {
    servicio?: IServicioAdmin
    onSaved?: () => void
}

export const ServicioForm = ({ className, servicio, onSaved, ...props }: ServicioFormProps) => {
    const isEditing = Boolean(servicio)
    const [submitting, setSubmitting] = useState(false)

    const buildDefaults = (s?: IServicioAdmin): ServicioFormValues => ({
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
        const payload = { ...data, imagen: data.imagen || null }
        const ok = isEditing && servicio
            ? await updateServicio(servicio.id, payload)
            : await insertServicio(payload)
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
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                        id="nombre"
                        type="text"
                        placeholder="Ej: Diseno y Desarrollo Web"
                        aria-invalid={Boolean(errors.nombre)}
                        {...register("nombre", { required: true })}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="tipo">Tipo</Label>
                    <Input
                        id="tipo"
                        type="text"
                        placeholder="Ej: Desarrollo Web"
                        aria-invalid={Boolean(errors.tipo)}
                        {...register("tipo", { required: true })}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="descripcion">Descripcion</Label>
                    <Textarea
                        id="descripcion"
                        className="min-h-32"
                        placeholder="Descripcion del servicio"
                        aria-invalid={Boolean(errors.descripcion)}
                        {...register("descripcion", { required: true })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="precio">Precio (€)</Label>
                        <Input
                            id="precio"
                            type="number"
                            step="0.01"
                            placeholder="Ej: 250.00"
                            aria-invalid={Boolean(errors.precio)}
                            {...register("precio", { required: true, valueAsNumber: true })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="imagen">URL de la imagen</Label>
                        <Input
                            id="imagen"
                            type="url"
                            placeholder="https://..."
                            {...register("imagen")}
                        />
                    </div>
                </div>

                <Button type="submit" className="mt-2 w-full" disabled={submitting}>
                    {submitting ? "Guardando..." : isEditing ? "Guardar cambios" : "Anadir servicio"}
                </Button>
            </form>
        </div>
    )
}
