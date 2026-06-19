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
import { TrabajoForm } from "@/components/admin/trabajos/TrabajoForm"
import { TrabajosTable } from "@/components/admin/trabajos/TrabajosTable"
import { deleteTrabajo, getTrabajos } from "@/model/api/backend/apiTrabajos"
import type { ITrabajo } from "@/model/interfaces/ITrabajo"

export const AdminTrabajos = () => {
    const [trabajos, setTrabajos] = useState<ITrabajo[]>([])
    const [loading, setLoading] = useState(true)
    const [createOpen, setCreateOpen] = useState(false)
    const [editing, setEditing] = useState<ITrabajo | null>(null)
    const [deleting, setDeleting] = useState<ITrabajo | null>(null)

    const fetchTrabajos = async () => {
        setLoading(true)
        const data = await getTrabajos()
        setTrabajos(data)
        setLoading(false)
    }

    useEffect(() => {
        let active = true
        getTrabajos().then((data) => {
            if (active) {
                setTrabajos(data)
                setLoading(false)
            }
        })
        return () => {
            active = false
        }
    }, [])

    const handleConfirmDelete = async () => {
        if (!deleting) return
        await deleteTrabajo(deleting.id)
        setDeleting(null)
        fetchTrabajos()
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-headline-md text-foreground">Mis trabajos</h2>
                    <p className="text-body-sm text-muted-foreground">
                        Administra los proyectos que se muestran en tu portfolio publico.
                    </p>
                </div>
                <Button onClick={() => setCreateOpen(true)}>
                    <PlusIcon /> Nuevo trabajo
                </Button>
            </div>

            <TrabajosTable
                trabajos={trabajos}
                loading={loading}
                onEdit={setEditing}
                onDelete={setDeleting}
            />

            {/* Crear */}
            <Sheet open={createOpen} onOpenChange={setCreateOpen}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Nuevo trabajo</SheetTitle>
                        <SheetDescription>
                            Completa el formulario para anadir un proyecto al portfolio.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="px-4">
                        <TrabajoForm
                            onSaved={() => {
                                setCreateOpen(false)
                                fetchTrabajos()
                            }}
                        />
                    </div>
                </SheetContent>
            </Sheet>

            {/* Editar */}
            <Sheet open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Editar trabajo</SheetTitle>
                        <SheetDescription>
                            Modifica los datos y guarda los cambios.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="px-4">
                        {editing && (
                            <TrabajoForm
                                trabajo={editing}
                                onSaved={() => {
                                    setEditing(null)
                                    fetchTrabajos()
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
                        <AlertDialogTitle>Eliminar trabajo</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta accion no se puede deshacer. Se eliminara permanentemente
                            "{deleting?.titulo}" del portfolio.
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
