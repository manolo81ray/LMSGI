import { ExternalLinkIcon, PencilIcon, Trash2Icon } from "lucide-react"

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
import type { ITrabajo } from "@/model/interfaces/ITrabajo"

interface TrabajosTableProps {
    trabajos: ITrabajo[]
    loading: boolean
    onEdit: (trabajo: ITrabajo) => void
    onDelete: (trabajo: ITrabajo) => void
}

export const TrabajosTable = ({ trabajos, loading, onEdit, onDelete }: TrabajosTableProps) => {
    if (loading) {
        return <p className="text-body-sm text-muted-foreground">Cargando trabajos...</p>
    }

    if (trabajos.length === 0) {
        return (
            <div className="surface-card flex flex-col items-center gap-1 px-6 py-10 text-center">
                <p className="text-headline-sm text-foreground">Todavia no hay trabajos</p>
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
                            <TableHead className="text-label-md text-muted-foreground">Tecnologias</TableHead>
                            <TableHead className="text-label-md text-muted-foreground">Enlace</TableHead>
                            <TableHead className="text-label-md text-right text-muted-foreground">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trabajos.map((trabajo) => (
                            <TableRow key={trabajo.id} className="hover:bg-accent/60">
                                <TableCell className="py-3 font-medium text-foreground">{trabajo.titulo}</TableCell>
                                <TableCell className="py-3">
                                    <div className="flex max-w-xs flex-wrap gap-1">
                                        {trabajo.tecnologias?.slice(0, 3).map((tecnologia) => (
                                            <Badge key={tecnologia} variant="outline">{tecnologia}</Badge>
                                        ))}
                                        {trabajo.tecnologias?.length > 3 && (
                                            <span className="text-xs text-muted-foreground">+{trabajo.tecnologias.length - 3}</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="py-3">
                                    {trabajo.enlace ? (
                                        <a
                                            href={trabajo.enlace}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                        >
                                            Ver <ExternalLinkIcon className="size-3.5" />
                                        </a>
                                    ) : (
                                        <span className="text-sm text-muted-foreground">-</span>
                                    )}
                                </TableCell>
                                <TableCell className="py-3 text-right">
                                    <div className="flex items-center justify-end gap-4">
                                        <Button variant="ghost" size="icon-sm" onClick={() => onEdit(trabajo)} aria-label="Editar trabajo">
                                            <PencilIcon />
                                        </Button>
                                        <Button variant="destructive" size="icon-sm" onClick={() => onDelete(trabajo)} aria-label="Eliminar trabajo">
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
                {trabajos.map((trabajo) => (
                    <div key={trabajo.id} className="surface-card flex flex-col gap-2 p-4">
                        <p className="text-headline-sm text-foreground">{trabajo.titulo}</p>
                        <p className="text-body-sm text-muted-foreground line-clamp-2">{trabajo.descripcion}</p>
                        <div className="flex flex-wrap gap-1">
                            {trabajo.tecnologias?.map((tecnologia) => (
                                <Badge key={tecnologia} variant="outline">{tecnologia}</Badge>
                            ))}
                        </div>
                        <div className="mt-2 flex items-center gap-4 border-t border-border pt-3">
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(trabajo)}>
                                <PencilIcon /> Editar
                            </Button>
                            <Button variant="destructive" size="sm" className="flex-1" onClick={() => onDelete(trabajo)}>
                                <Trash2Icon /> Eliminar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
