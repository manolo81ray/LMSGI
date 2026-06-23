import { useState } from "react"
import { EyeIcon, EyeOffIcon, PencilIcon, Trash2Icon, TriangleAlertIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { IRedSocial } from "@/model/interfaces/contacto/IRedSocial"
import { LoadingDatos } from "@/components/shared/LoadingDatos"

interface RedesTableProps {
    redes: IRedSocial[]
    loading: boolean
    onEdit: (red: IRedSocial) => void
    onDelete: (red: IRedSocial) => void
    onHide: (id: number) => void
    onShow: (id: number) => void
}

// Inserta unas clases al SVG para que se vea a tamaño fijo y herede el color.
const previewSvg = (svg: string) =>
    svg.includes("<svg ")
        ? svg.replace("<svg ", '<svg class="size-7 fill-foreground stroke-foreground" ')
        : svg

export const RedesTable = ({ redes, loading, onEdit, onDelete, onHide, onShow }: RedesTableProps) => {
    const [toHide, setToHide] = useState<IRedSocial | undefined>(undefined)

    if (loading) return <LoadingDatos texto="Cargando redes..." fullScreen={false} />
    if (redes.length === 0) return (
        <div className="flex flex-col items-center gap-1 px-6 py-10 text-center">
            <p className="text-sm font-medium text-foreground">Todavia no hay redes sociales</p>
            <p className="text-sm text-muted-foreground">Anade la primera con el boton de arriba.</p>
        </div>
    )

    return (
        <>
            <div className="hidden md:block">
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Icono</TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nombre</TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Enlace</TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Orden</TableHead>
                            <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {redes.map((r) => (
                            <TableRow key={r.id} className={cn("hover:bg-accent/60 transition-colors", !r.visible && "opacity-50 [&_td]:line-through [&_td]:decoration-muted-foreground/60 [&_td]:decoration-1")}>
                                <TableCell className="py-3">
                                    <span className="inline-flex size-8 items-center justify-center" dangerouslySetInnerHTML={{ __html: previewSvg(r.icono) }} />
                                </TableCell>
                                <TableCell className="py-3 font-medium text-foreground">{r.nombre}</TableCell>
                                <TableCell className="py-3 max-w-[16rem] truncate text-muted-foreground">
                                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">{r.url}</a>
                                </TableCell>
                                <TableCell className="py-3 text-muted-foreground">{r.orden}</TableCell>
                                <TableCell className="py-3 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        {r.visible
                                            ? <Button variant="ghost" size="icon-sm" onClick={() => setToHide(r)} aria-label="Ocultar en web"><EyeIcon className="text-emerald-400" /></Button>
                                            : <Button variant="ghost" size="icon-sm" onClick={() => onShow(r.id)} aria-label="Mostrar en web"><EyeOffIcon className="text-muted-foreground" /></Button>
                                        }
                                        <Button variant="ghost" size="icon-sm" onClick={() => onEdit(r)} aria-label="Editar red social"><PencilIcon /></Button>
                                        <Button variant="destructive" size="icon-sm" onClick={() => onDelete(r)} aria-label="Eliminar red social"><Trash2Icon /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col divide-y divide-border md:hidden">
                {redes.map((r) => (
                    <div key={r.id} className={cn("flex items-center gap-3 p-4", !r.visible && "opacity-50")}>
                        <span className="inline-flex size-10 shrink-0 items-center justify-center" dangerouslySetInnerHTML={{ __html: previewSvg(r.icono) }} />
                        <div className="flex min-w-0 flex-1 flex-col">
                            <p className="font-medium text-foreground">{r.nombre}</p>
                            <p className="truncate text-xs text-muted-foreground">{r.url}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            {r.visible
                                ? <Button variant="ghost" size="icon-sm" onClick={() => setToHide(r)}><EyeIcon className="text-emerald-400" /></Button>
                                : <Button variant="ghost" size="icon-sm" onClick={() => onShow(r.id)}><EyeOffIcon className="text-muted-foreground" /></Button>
                            }
                            <Button variant="ghost" size="icon-sm" onClick={() => onEdit(r)}><PencilIcon /></Button>
                            <Button variant="destructive" size="icon-sm" onClick={() => onDelete(r)}><Trash2Icon /></Button>
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
                            <strong>{toHide?.nombre ?? `Red ${toHide?.id}`}</strong> dejara de mostrarse en la web publica. Podras restaurarla haciendo clic en el icono de ojo cruzado.
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
