import { PencilIcon, Trash2Icon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { ICurso } from "@/model/interfaces/ICurso"

interface CursosTableProps {
    cursos: ICurso[]
    loading: boolean
    onEdit: (curso: ICurso) => void
    onDelete: (curso: ICurso) => void
}

const formatPrecio = (precio: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(precio)

export const CursosTable = ({ cursos, loading, onEdit, onDelete }: CursosTableProps) => {
    if (loading) {
        return (
            <p className="text-body-sm text-muted-foreground">Cargando cursos...</p>
        )
    }

    if (cursos.length === 0) {
        return (
            <div className="surface-card flex flex-col items-center gap-1 px-6 py-10 text-center">
                <p className="text-headline-sm text-foreground">Todavia no hay cursos</p>
                <p className="text-body-sm text-muted-foreground">
                    Anade el primero con el formulario de arriba.
                </p>
            </div>
        )
    }

    return (
        <>
            {/* Tabla - viewports medianos y grandes */}
            <div className="surface-card hidden overflow-hidden md:block">
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead className="text-label-md text-muted-foreground">Titulo</TableHead>
                            <TableHead className="text-label-md text-muted-foreground">Plataforma</TableHead>
                            <TableHead className="text-label-md text-muted-foreground">Etiquetas</TableHead>
                            <TableHead className="text-label-md text-muted-foreground">Precio</TableHead>
                            <TableHead className="text-label-md text-right text-muted-foreground">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cursos.map((curso) => (
                            <TableRow key={curso.id} className="hover:bg-accent/60">
                                <TableCell className="py-3 font-medium text-foreground">{curso.titulo}</TableCell>
                                <TableCell className="py-3">
                                    <Badge variant="secondary">{curso.plataforma}</Badge>
                                </TableCell>
                                <TableCell className="py-3 text-muted-foreground">
                                    <div className="flex max-w-xs flex-wrap gap-1">
                                        {curso.etiquetas?.slice(0, 3).map((etiqueta) => (
                                            <Badge key={etiqueta} variant="outline">{etiqueta}</Badge>
                                        ))}
                                        {curso.etiquetas?.length > 3 && (
                                            <span className="text-xs">+{curso.etiquetas.length - 3}</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 text-foreground">{formatPrecio(curso.precio)}</TableCell>
                                <TableCell className="py-3 text-right">
                                    <div className="flex items-center justify-end gap-4">
                                        <Button variant="ghost" size="icon-sm" onClick={() => onEdit(curso)} aria-label="Editar curso">
                                            <PencilIcon />
                                        </Button>
                                        <Button variant="destructive" size="icon-sm" onClick={() => onDelete(curso)} aria-label="Eliminar curso">
                                            <Trash2Icon />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Tarjetas - moviles */}
            <div className="flex flex-col gap-3 md:hidden">
                {cursos.map((curso) => (
                    <div key={curso.id} className="surface-card flex flex-col gap-2 p-4">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-headline-sm text-foreground">{curso.titulo}</p>
                                <p className="text-body-sm text-muted-foreground">{curso.plataforma}</p>
                            </div>
                            <Badge variant="secondary">{formatPrecio(curso.precio)}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {curso.etiquetas?.map((etiqueta) => (
                                <Badge key={etiqueta} variant="outline">{etiqueta}</Badge>
                            ))}
                        </div>
                        <div className="mt-2 flex items-center gap-4 border-t border-border pt-3">
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(curso)}>
                                <PencilIcon /> Editar
                            </Button>
                            <Button variant="destructive" size="sm" className="flex-1" onClick={() => onDelete(curso)}>
                                <Trash2Icon /> Eliminar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
