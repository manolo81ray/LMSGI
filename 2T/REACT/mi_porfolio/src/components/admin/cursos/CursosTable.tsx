import { useState } from "react"
import { CheckCircle2Icon, EyeIcon, EyeOffIcon, LoaderIcon, PencilIcon, Trash2Icon, TriangleAlertIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ICursos } from "@/model/interfaces/formacion/ICursos"
import { LoadingDatos } from "@/components/shared/LoadingDatos"

interface CursosTableProps {
    cursos: ICursos[]
    loading: boolean
    onEdit: (curso: ICursos) => void
    onDelete: (curso: ICursos) => void
    onHide: (id: number) => void
    onShow: (id: number) => void
    onToggleEnCurso: (id: number, enCurso: boolean) => void
}

const formatPrecio = (precio: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(precio)

export const CursosTable = ({ cursos, loading, onEdit, onDelete, onHide, onShow, onToggleEnCurso }: CursosTableProps) => {
    const [toHide, setToHide] = useState<ICursos | undefined>(undefined)

    if (loading) return <LoadingDatos texto="Cargando cursos..." fullScreen={false} />
    if (cursos.length === 0) return (
        <div className="flex flex-col items-center gap-1 px-6 py-10 text-center">
            <p className="text-sm font-medium text-foreground">Todavia no hay cursos</p>
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
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Plataforma</TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Etiquetas</TableHead>
                            <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Precio</TableHead>
                            <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cursos.map((curso) => (
                            <TableRow key={curso.id} className={cn("hover:bg-accent/60 transition-colors", !curso.visible && "opacity-50 [&_td]:line-through [&_td]:decoration-muted-foreground/60 [&_td]:decoration-1")}>
                                <TableCell className="py-3 font-medium text-foreground">{curso.titulo}</TableCell>
                                <TableCell className="py-3"><Badge variant="secondary">{curso.plataforma}</Badge></TableCell>
                                <TableCell className="py-3">
                                    <div className="flex max-w-xs flex-wrap gap-1">
                                        {curso.etiquetas?.slice(0, 3).map((e) => <Badge key={e} variant="outline">{e}</Badge>)}
                                        {curso.etiquetas?.length > 3 && <span className="text-xs text-muted-foreground">+{curso.etiquetas.length - 3}</span>}
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 text-foreground">{formatPrecio(curso.precio)}</TableCell>
                                <TableCell className="py-3 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        {curso.en_curso
                                            ? <Button variant="ghost" size="icon-sm" onClick={() => onToggleEnCurso(curso.id, false)} aria-label="Marcar como completado"><LoaderIcon className="text-sky-400" /></Button>
                                            : <Button variant="ghost" size="icon-sm" onClick={() => onToggleEnCurso(curso.id, true)} aria-label="Marcar como en curso"><CheckCircle2Icon className="text-emerald-400" /></Button>
                                        }
                                        {curso.visible
                                            ? <Button variant="ghost" size="icon-sm" onClick={() => setToHide(curso)} aria-label="Ocultar en web"><EyeIcon className="text-emerald-400" /></Button>
                                            : <Button variant="ghost" size="icon-sm" onClick={() => onShow(curso.id)} aria-label="Mostrar en web"><EyeOffIcon className="text-muted-foreground" /></Button>
                                        }
                                        <Button variant="ghost" size="icon-sm" onClick={() => onEdit(curso)} aria-label="Editar curso"><PencilIcon /></Button>
                                        <Button variant="destructive" size="icon-sm" onClick={() => onDelete(curso)} aria-label="Eliminar curso"><Trash2Icon /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col divide-y divide-border md:hidden">
                {cursos.map((curso) => (
                    <div key={curso.id} className={cn("flex flex-col gap-2 p-4", !curso.visible && "opacity-50")}>
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="font-medium text-foreground">{curso.titulo}</p>
                                <p className="text-sm text-muted-foreground">{curso.plataforma}</p>
                            </div>
                            <Badge variant="secondary">{formatPrecio(curso.precio)}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {curso.etiquetas?.map((e) => <Badge key={e} variant="outline">{e}</Badge>)}
                        </div>
                        <div className="mt-1 flex items-center gap-3 border-t border-border pt-3">
                            {curso.en_curso
                                ? <Button variant="ghost" size="icon-sm" onClick={() => onToggleEnCurso(curso.id, false)} aria-label="Marcar como completado"><LoaderIcon className="text-sky-400" /></Button>
                                : <Button variant="ghost" size="icon-sm" onClick={() => onToggleEnCurso(curso.id, true)} aria-label="Marcar como en curso"><CheckCircle2Icon className="text-emerald-400" /></Button>
                            }
                            {curso.visible
                                ? <Button variant="ghost" size="icon-sm" onClick={() => setToHide(curso)}><EyeIcon className="text-emerald-400" /></Button>
                                : <Button variant="ghost" size="icon-sm" onClick={() => onShow(curso.id)}><EyeOffIcon className="text-muted-foreground" /></Button>
                            }
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(curso)}><PencilIcon /> Editar</Button>
                            <Button variant="destructive" size="sm" className="flex-1" onClick={() => onDelete(curso)}><Trash2Icon /> Eliminar</Button>
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
