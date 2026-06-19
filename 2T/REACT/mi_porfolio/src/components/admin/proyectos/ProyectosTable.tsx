import { useState } from "react"
import { ExternalLinkIcon, EyeIcon, EyeOffIcon, PencilIcon, Trash2Icon, TriangleAlertIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { IProyectos } from "@/model/interfaces/proyectos/IProyectos"
import { LoadingDatos } from "@/components/shared/LoadingDatos"

interface ProyectosTableProps {
    proyectos: IProyectos[]
    loading: boolean
    onEdit: (proyecto: IProyectos) => void
    onDelete: (proyecto: IProyectos) => void
    onHide: (id: number) => void
    onShow: (id: number) => void
}

export const ProyectosTable = ({ proyectos, loading, onEdit, onDelete, onHide, onShow }: ProyectosTableProps) => {
    const [toHide, setToHide] = useState<IProyectos | undefined>(undefined)

    if (loading) return <LoadingDatos texto="Cargando proyectos..." fullScreen={false} />
    if (proyectos.length === 0) return (
        <div className="flex flex-col items-center gap-1 px-6 py-10 text-center">
            <p className="text-sm font-medium text-foreground">Todavia no hay proyectos</p>
            <p className="text-sm text-muted-foreground">Anade el primero con el boton de arriba.</p>
        </div>
    )

    return (
        <>
            <div className="hidden md:block">
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Titulo</TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tecnologia</TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Etiquetas</TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Enlace</TableHead>
                            <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {proyectos.map((proyecto) => (
                            <TableRow key={proyecto.id} className={cn("hover:bg-accent/60 transition-colors", !proyecto.visible && "opacity-50 [&_td]:line-through [&_td]:decoration-muted-foreground/60 [&_td]:decoration-1")}>
                                <TableCell className="py-3 font-medium text-foreground">{proyecto.titulo}</TableCell>
                                <TableCell className="py-3"><Badge variant="secondary">{proyecto.tecnologia}</Badge></TableCell>
                                <TableCell className="py-3">
                                    <div className="flex max-w-xs flex-wrap gap-1">
                                        {proyecto.etiquetas?.slice(0, 3).map((e) => <Badge key={e} variant="outline">{e}</Badge>)}
                                        {proyecto.etiquetas?.length > 3 && <span className="text-xs text-muted-foreground">+{proyecto.etiquetas.length - 3}</span>}
                                    </div>
                                </TableCell>
                                <TableCell className="py-3">
                                    {proyecto.url
                                        ? <a href={proyecto.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">Ver <ExternalLinkIcon className="size-3.5" /></a>
                                        : <span className="text-sm text-muted-foreground">-</span>}
                                </TableCell>
                                <TableCell className="py-3 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        {proyecto.visible
                                            ? <Button variant="ghost" size="icon-sm" onClick={() => setToHide(proyecto)} aria-label="Ocultar en web"><EyeIcon className="text-emerald-400" /></Button>
                                            : <Button variant="ghost" size="icon-sm" onClick={() => onShow(proyecto.id)} aria-label="Mostrar en web"><EyeOffIcon className="text-muted-foreground" /></Button>
                                        }
                                        <Button variant="ghost" size="icon-sm" onClick={() => onEdit(proyecto)} aria-label="Editar proyecto"><PencilIcon /></Button>
                                        <Button variant="destructive" size="icon-sm" onClick={() => onDelete(proyecto)} aria-label="Eliminar proyecto"><Trash2Icon /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col divide-y divide-border md:hidden">
                {proyectos.map((proyecto) => (
                    <div key={proyecto.id} className={cn("flex flex-col gap-2 p-4", !proyecto.visible && "opacity-50")}>
                        <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-foreground">{proyecto.titulo}</p>
                            <Badge variant="secondary">{proyecto.tecnologia}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{proyecto.descripcion}</p>
                        <div className="flex flex-wrap gap-1">
                            {proyecto.etiquetas?.map((e) => <Badge key={e} variant="outline">{e}</Badge>)}
                        </div>
                        <div className="mt-1 flex items-center gap-3 border-t border-border pt-3">
                            {proyecto.visible
                                ? <Button variant="ghost" size="icon-sm" onClick={() => setToHide(proyecto)}><EyeIcon className="text-emerald-400" /></Button>
                                : <Button variant="ghost" size="icon-sm" onClick={() => onShow(proyecto.id)}><EyeOffIcon className="text-muted-foreground" /></Button>
                            }
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(proyecto)}><PencilIcon /> Editar</Button>
                            <Button variant="destructive" size="sm" className="flex-1" onClick={() => onDelete(proyecto)}><Trash2Icon /> Eliminar</Button>
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
                            <strong>{toHide?.titulo}</strong> dejara de mostrarse en la web publica. Podras restaurarlo haciendo clic en el icono de ojo cruzado.
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
