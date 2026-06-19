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
import { CursoForm } from "@/components/admin/cursos/CursoForm"
import { CursosTable } from "@/components/admin/cursos/CursosTable"
import { deleteCurso, getCursos } from "@/model/api/backend/apiCursos"
import type { ICurso } from "@/model/interfaces/ICurso"

export const AdminCursos = () => {
    const [cursos, setCursos] = useState<ICurso[]>([])
    const [loading, setLoading] = useState(true)
    const [createOpen, setCreateOpen] = useState(false)
    const [editing, setEditing] = useState<ICurso | null>(null)
    const [deleting, setDeleting] = useState<ICurso | null>(null)

    const fetchCursos = async () => {
        setLoading(true)
        const data = await getCursos()
        setCursos(data)
        setLoading(false)
    }

    useEffect(() => {
        let active = true
        getCursos().then((data) => {
            if (active) {
                setCursos(data)
                setLoading(false)
            }
        })
        return () => {
            active = false
        }
    }, [])

    const handleConfirmDelete = async () => {
        if (!deleting) return
        await deleteCurso(deleting.id)
        setDeleting(null)
        fetchCursos()
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-headline-md text-foreground">Mis cursos</h2>
                    <p className="text-body-sm text-muted-foreground">
                        Administra la formacion que se muestra en tu portfolio publico.
                    </p>
                </div>
                <Button onClick={() => setCreateOpen(true)}>
                    <PlusIcon /> Nuevo curso
                </Button>
            </div>

            <CursosTable
                cursos={cursos}
                loading={loading}
                onEdit={setEditing}
                onDelete={setDeleting}
            />

            {/* Crear */}
            <Sheet open={createOpen} onOpenChange={setCreateOpen}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Nuevo curso</SheetTitle>
                        <SheetDescription>
                            Completa el formulario para anadir un curso al portfolio.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="px-4">
                        <CursoForm
                            onSaved={() => {
                                setCreateOpen(false)
                                fetchCursos()
                            }}
                        />
                    </div>
                </SheetContent>
            </Sheet>

            {/* Editar */}
            <Sheet open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Editar curso</SheetTitle>
                        <SheetDescription>
                            Modifica los datos y guarda los cambios.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="px-4">
                        {editing && (
                            <CursoForm
                                curso={editing}
                                onSaved={() => {
                                    setEditing(null)
                                    fetchCursos()
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
                        <AlertDialogTitle>Eliminar curso</AlertDialogTitle>
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
