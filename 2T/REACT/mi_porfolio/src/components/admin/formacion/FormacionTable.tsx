import { useState } from "react"
import { EyeIcon, EyeOffIcon, PencilIcon, Trash2Icon, TriangleAlertIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { IFormacion } from "@/model/interfaces/formacion/IFormacion"
import { LoadingDatos } from "@/components/shared/LoadingDatos"

interface FormacionTableProps {
    formaciones: IFormacion[]
    loading: boolean
    onEdit: (formacion: IFormacion) => void
    onDelete: (formacion: IFormacion) => void
    onHide: (id: number) => void
    onShow: (id: number) => void
}

const formatFecha = (fecha: string | Date) =>
    new Date(fecha).toLocaleDateString("es-ES", { year: "numeric", month: "short" })

export const FormacionTable = ({ formaciones, loading, onEdit, onDelete, onHide, onShow }: FormacionTableProps) => {
    const [toHide, setToHide] = useState<IFormacion | undefined>(undefined)

    if (loading) return <LoadingDatos texto="Cargando formaciones..." fullScreen={false} />
    if (formaciones.length === 0) return (
        <div className="flex flex-col items-center gap-1 px-6 py-10 text-center">
            <p className="text-sm font-medium text-foreground">Todavia no hay formaciones</p>
            <p className="text-sm text-muted-foreground">Anade la primera con el boton de arriba.</p>
        </div>
    )

    return (
        <>
            <div className="hidden md:block">
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nombre</TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tipo</TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Institucion</TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Periodo</TableHead>
                            <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {formaciones.map((f) => (
                            <TableRow key={f.id} className={cn("hover:bg-accent/60 transition-colors", !f.visible && "opacity-50 [&_td]:line-through [&_td]:decoration-muted-foreground/60 [&_td]:decoration-1")}>
                                <TableCell className="py-3 font-medium text-foreground">{f.nombre}</TableCell>
                                <TableCell className="py-3"><Badge variant="secondary">{f.tipo}</Badge></TableCell>
                                <TableCell className="py-3 text-foreground">{f.institucion}</TableCell>
                                <TableCell className="py-3 text-sm text-muted-foreground">
                                    {formatFecha(f.fecha_inicio)} — {formatFecha(f.fecha_fin)}
                                </TableCell>
                                <TableCell className="py-3 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        {f.visible
                                            ? <Button variant="ghost" size="icon-sm" onClick={() => setToHide(f)} aria-label="Ocultar en web"><EyeIcon className="text-emerald-400" /></Button>
                                            : <Button variant="ghost" size="icon-sm" onClick={() => onShow(f.id)} aria-label="Mostrar en web"><EyeOffIcon className="text-muted-foreground" /></Button>
                                        }
                                        <Button variant="ghost" size="icon-sm" onClick={() => onEdit(f)} aria-label="Editar formacion"><PencilIcon /></Button>
                                        <Button variant="destructive" size="icon-sm" onClick={() => onDelete(f)} aria-label="Eliminar formacion"><Trash2Icon /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col divide-y divide-border md:hidden">
                {formaciones.map((f) => (
                    <div key={f.id} className={cn("flex flex-col gap-2 p-4", !f.visible && "opacity-50")}>
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="font-medium text-foreground">{f.nombre}</p>
                                <p className="text-sm text-muted-foreground">{f.institucion}</p>
                            </div>
                            <Badge variant="secondary">{f.tipo}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{formatFecha(f.fecha_inicio)} — {formatFecha(f.fecha_fin)}</p>
                        <div className="mt-1 flex items-center gap-3 border-t border-border pt-3">
                            {f.visible
                                ? <Button variant="ghost" size="icon-sm" onClick={() => setToHide(f)}><EyeIcon className="text-emerald-400" /></Button>
                                : <Button variant="ghost" size="icon-sm" onClick={() => onShow(f.id)}><EyeOffIcon className="text-muted-foreground" /></Button>
                            }
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(f)}><PencilIcon /> Editar</Button>
                            <Button variant="destructive" size="sm" className="flex-1" onClick={() => onDelete(f)}><Trash2Icon /> Eliminar</Button>
                        </div>
                    </div>
                ))}
            </div>

            <AlertDialog open={Boolean(toHide)} onOpenChange={(open) => { if (!open) setToHide(undefined) }}>
                <AlertDialogContent className="admin-theme dark">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <TriangleAlertIcon className="size-5 text-amber-400" />
                            Ocultar del sitio web
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <strong>{toHide?.nombre}</strong> dejara de mostrarse en la web publica. Podras restaurarlo haciendo clic en el icono de ojo cruzado.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => { if (toHide) { onHide(toHide.id); setToHide(undefined) } }} className="bg-amber-500 text-white hover:bg-amber-600">
                            Ocultar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
