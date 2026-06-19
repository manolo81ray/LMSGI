import { useEffect, useState } from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ServicioForm } from "@/components/admin/servicios/ServicioForm"
import { ServiciosTable } from "@/components/admin/servicios/ServiciosTable"
import { deleteServicio, getServicios } from "@/model/api/backend/apiServicios"
import type { IServicioAdmin } from "@/model/interfaces/IServicioAdmin"

export const AdminServicios = () => {
    const [servicios, setServicios] = useState<IServicioAdmin[]>([])
    const [loading, setLoading] = useState(true)
    const [createOpen, setCreateOpen] = useState(false)
    const [editing, setEditing] = useState<IServicioAdmin | null>(null)
    const [deleting, setDeleting] = useState<IServicioAdmin | null>(null)

    const fetchServicios = async () => {
        setLoading(true)
        const data = await getServicios()
        setServicios(data)
        setLoading(false)
    }

    useEffect(() => {
        let active = true
        getServicios().then((data) => {
            if (active) {
                setServicios(data)
                setLoading(false)
            }
        })
        return () => {
            active = false
        }
    }, [])

    const handleConfirmDelete = async () => {
        if (!deleting) return
        await deleteServicio(deleting.id)
        setDeleting(null)
        fetchServicios()
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-headline-md text-foreground">Mis servicios</h2>
                    <p className="text-body-sm text-muted-foreground">
                        Administra los servicios que ofreces en tu portfolio publico.
                    </p>
                </div>
                <Button onClick={() => setCreateOpen(true)}>
                    <PlusIcon /> Nuevo servicio
                </Button>
            </div>

            <ServiciosTable
                servicios={servicios}
                loading={loading}
                onEdit={setEditing}
                onDelete={setDeleting}
            />

            {/* Crear */}
            <Sheet open={createOpen} onOpenChange={setCreateOpen}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Nuevo servicio</SheetTitle>
                        <SheetDescription>
                            Completa el formulario para anadir un servicio al portfolio.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="px-4">
                        <ServicioForm
                            onSaved={() => {
                                setCreateOpen(false)
                                fetchServicios()
                            }}
                        />
                    </div>
                </SheetContent>
            </Sheet>

            {/* Editar */}
            <Sheet open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Editar servicio</SheetTitle>
                        <SheetDescription>
                            Modifica los datos y guarda los cambios.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="px-4">
                        {editing && (
                            <ServicioForm
                                servicio={editing}
                                onSaved={() => {
                                    setEditing(null)
                                    fetchServicios()
                                }}
                            />
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            {/* Eliminar */}
            <AlertDialog open={Boolean(deleting)} onOpenChange={(open) => !open && setDeleting(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar servicio</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta accion no se puede deshacer. Se eliminara permanentemente
                            "{deleting?.nombre}" del portfolio.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete}>Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
