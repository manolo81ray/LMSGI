import { useForm, type SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"
import { PlusIcon, SaveIcon, Share2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormSection } from "@/components/admin/shared/FormSection"
import { insertRed, updateRed } from "@/model/api/backend/redes/apiRedes"
import type { IRedSocial } from "@/model/interfaces/contacto/IRedSocial"

type RedFormValues = Omit<IRedSocial, "id">

interface RedFormProps extends React.HTMLAttributes<HTMLDivElement> {
    red?: IRedSocial
    onSaved?: () => void
}

export const RedForm = ({ className, red, onSaved, ...props }: RedFormProps) => {
    const isEditing = Boolean(red)
    const [submitting, setSubmitting] = useState(false)

    const buildDefaults = (r?: IRedSocial): RedFormValues => ({
        nombre: r?.nombre ?? "",
        icono: r?.icono ?? "",
        url: r?.url ?? "",
        orden: r?.orden ?? 0,
        visible: r?.visible ?? true,
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<RedFormValues>({
        defaultValues: buildDefaults(red),
    })

    useEffect(() => {
        reset(buildDefaults(red))
    }, [red, reset])

    const enviarDatos: SubmitHandler<RedFormValues> = async (data) => {
        setSubmitting(true)
        const payload = { ...data, orden: Number(data.orden) || 0 }
        const ok = isEditing && red
            ? await updateRed(red.id, payload)
            : await insertRed(payload)
        setSubmitting(false)
        if (ok) {
            if (!isEditing) reset(buildDefaults())
            onSaved?.()
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(enviarDatos)} className="flex flex-col gap-4">
                <FormSection title={isEditing ? "Editando red social" : "Nueva red social"} icon={<Share2Icon />} accent="indigo">
                    <div className="grid gap-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" type="text" placeholder="Ej: LinkedIn" aria-invalid={Boolean(errors.nombre)} {...register("nombre", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="url">Enlace al perfil</Label>
                        <Input id="url" type="url" placeholder="https://..." aria-invalid={Boolean(errors.url)} {...register("url", { required: true })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="icono">Icono (código SVG)</Label>
                        <textarea
                            id="icono"
                            rows={5}
                            placeholder="<svg ...>...</svg>"
                            aria-invalid={Boolean(errors.icono)}
                            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 font-mono text-xs shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive resize-y"
                            {...register("icono", { required: true })}
                        />
                        <p className="text-xs text-muted-foreground">Pega el código SVG del logo. Hereda el color del texto automáticamente.</p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="orden">Orden</Label>
                        <Input id="orden" type="number" placeholder="0" {...register("orden")} />
                        <p className="text-xs text-muted-foreground">Menor número aparece antes.</p>
                    </div>
                </FormSection>

                <div className="mt-1 border-t border-border pt-4">
                    <Button type="submit" className="w-full" disabled={submitting}>
                        {isEditing ? <SaveIcon /> : <PlusIcon />}
                        {submitting ? "Guardando..." : isEditing ? "Guardar cambios" : "Anadir red social"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
