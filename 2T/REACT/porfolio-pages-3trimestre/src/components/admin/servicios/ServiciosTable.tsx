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
import type { IServicioAdmin } from "@/model/interfaces/IServicioAdmin"

interface ServiciosTableProps {
    servicios: IServicioAdmin[]
    loading: boolean
    onEdit: (servicio: IServicioAdmin) => void
    onDelete: (servicio: IServicioAdmin) => void
}

const formatPrecio = (precio: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(precio)

export const ServiciosTable = ({ servicios, loading, onEdit, onDelete }: ServiciosTableProps) => {
    if (loading) {
        return <p className="text-body-sm text-muted-foreground">Cargando servicios...</p>
    }

    if (servicios.length === 0) {
        return (
            <div className="surface-card flex flex-col items-center gap-1 px-6 py-10 text-center">
                <p className="text-headline-sm text-foreground">Todavia no hay servicios</p>
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
                            <TableHead className="text-label-md text-muted-foreground">Nombre</TableHead>
                            <TableHead className="text-label-md text-muted-foreground">Tipo</TableHead>
                            <TableHead className="text-label-md text-muted-foreground">Precio</TableHead>
                            <TableHead className="text-label-md text-right text-muted-foreground">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {servicios.map((servicio) => (
                            <TableRow key={servicio.id} className="hover:bg-accent/60">
                                <TableCell className="py-3 font-medium text-foreground">{servicio.nombre}</TableCell>
                                <TableCell className="py-3">
                                    <Badge variant="secondary">{servicio.tipo}</Badge>
                                </TableCell>
                                <TableCell className="py-3 text-foreground">{formatPrecio(servicio.precio)}</TableCell>
                                <TableCell className="py-3 text-right">
                                    <div className="flex items-center justify-end gap-4">
                                        <Button variant="ghost" size="icon-sm" onClick={() => onEdit(servicio)} aria-label="Editar servicio">
                                            <PencilIcon />
                                        </Button>
                                        <Button variant="destructive" size="icon-sm" onClick={() => onDelete(servicio)} aria-label="Eliminar servicio">
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
                {servicios.map((servicio) => (
                    <div key={servicio.id} className="surface-card flex flex-col gap-2 p-4">
                        <div className="flex items-start justify-between gap-2">
                            <p className="text-headline-sm text-foreground">{servicio.nombre}</p>
                            <Badge variant="secondary">{servicio.tipo}</Badge>
                        </div>
                        <p className="text-body-sm text-muted-foreground line-clamp-2">{servicio.descripcion}</p>
                        <p className="text-body-md font-medium text-foreground">{formatPrecio(servicio.precio)}</p>
                        <div className="mt-2 flex items-center gap-4 border-t border-border pt-3">
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(servicio)}>
                                <PencilIcon /> Editar
                            </Button>
                            <Button variant="destructive" size="sm" className="flex-1" onClick={() => onDelete(servicio)}>
                                <Trash2Icon /> Eliminar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
