import { useState } from "react"
import { EyeIcon, EyeOffIcon, PencilIcon, Trash2Icon, TriangleAlertIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ILenguajes } from "@/model/interfaces/home/ILenguajes"
import { LoadingDatos } from "@/components/shared/LoadingDatos"

interface LenguajesTableProps {
    lenguajes: ILenguajes[]
    loading: boolean
    onEdit: (lenguaje: ILenguajes) => void
    onDelete: (lenguaje: ILenguajes) => void
    onHide: (id: number) => void
    onShow: (id: number) => void
}

export const LenguajesTable = ({ lenguajes, loading, onEdit, onDelete, onHide, onShow }: LenguajesTableProps) => {
    const [toHide, setToHide] = useState<ILenguajes | undefined>(undefined)

    if (loading) return <LoadingDatos texto="Cargando lenguajes..." fullScreen={false} />
    if (lenguajes.length === 0) return (
        <div className="flex flex-col items-center gap-1 px-6 py-10 text-center">
            <p className="text-sm font-medium text-foreground">Todavia no hay lenguajes</p>
            <p className="text-sm text-muted-foreground">Anade el primero con el boton de arriba.</p>
        </div>
    )

    return (
        <>
            <div className="hidden md:block">
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Logo</TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nombre</TableHead>
                            <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lenguajes.map((l) => (
                            <TableRow key={l.id_lenguaje} className={cn("hover:bg-accent/60 transition-colors", !l.visible && "opacity-50 [&_td]:line-through [&_td]:decoration-muted-foreground/60 [&_td]:decoration-1")}>
                                <TableCell className="py-3">
                                    <img src={l.logo} alt={l.nombre ?? "logo"} className="size-8 rounded object-contain" />
                                </TableCell>
                                <TableCell className="py-3 font-medium text-foreground">{l.nombre ?? "-"}</TableCell>
                                <TableCell className="py-3 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        {l.visible
                                            ? <Button variant="ghost" size="icon-sm" onClick={() => setToHide(l)} aria-label="Ocultar en web"><EyeIcon className="text-emerald-400" /></Button>
                                            : <Button variant="ghost" size="icon-sm" onClick={() => onShow(l.id_lenguaje)} aria-label="Mostrar en web"><EyeOffIcon className="text-muted-foreground" /></Button>
                                        }
                                        <Button variant="ghost" size="icon-sm" onClick={() => onEdit(l)} aria-label="Editar lenguaje"><PencilIcon /></Button>
                                        <Button variant="destructive" size="icon-sm" onClick={() => onDelete(l)} aria-label="Eliminar lenguaje"><Trash2Icon /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col divide-y divide-border md:hidden">
                {lenguajes.map((l) => (
                    <div key={l.id_lenguaje} className={cn("flex items-center gap-3 p-4", !l.visible && "opacity-50")}>
                        <img src={l.logo} alt={l.nombre ?? "logo"} className="size-10 rounded object-contain" />
                        <p className="flex-1 font-medium text-foreground">{l.nombre ?? "-"}</p>
                        <div className="flex items-center gap-3">
                            {l.visible
                                ? <Button variant="ghost" size="icon-sm" onClick={() => setToHide(l)}><EyeIcon className="text-emerald-400" /></Button>
                                : <Button variant="ghost" size="icon-sm" onClick={() => onShow(l.id_lenguaje)}><EyeOffIcon className="text-muted-foreground" /></Button>
                            }
                            <Button variant="ghost" size="icon-sm" onClick={() => onEdit(l)}><PencilIcon /></Button>
                            <Button variant="destructive" size="icon-sm" onClick={() => onDelete(l)}><Trash2Icon /></Button>
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
                            <strong>{toHide?.nombre ?? `Lenguaje ${toHide?.id_lenguaje}`}</strong> dejara de mostrarse en la web publica. Podras restaurarlo haciendo clic en el icono de ojo cruzado.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => { if (toHide) { onHide(toHide.id_lenguaje); setToHide(undefined) } }} className="bg-amber-500 text-white hover:bg-amber-600">
                            Ocultar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
