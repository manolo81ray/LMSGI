import { useEffect, useMemo, useState } from "react"
import { BookOpenIcon, CheckCircleIcon, LoaderIcon } from "lucide-react"

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet"
import { AdminTableShell } from "@/components/admin/shared/AdminTableShell"
import { StatCard } from "@/components/admin/shared/StatCard"
import { FormacionForm } from "@/components/admin/formacion/FormacionForm"
import { FormacionTable } from "@/components/admin/formacion/FormacionTable"
import { getFormaciones, deleteFormacion, updateFormacionVisible, updateFormacionEnCurso } from "@/model/api/backend/formacion/apiFormacion"
import type { IFormacion } from "@/model/interfaces/formacion/IFormacion"

const PAGE_SIZE = 10

export const FormacionHome = () => {
    const [formaciones, setFormaciones] = useState<IFormacion[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [editing, setEditing] = useState<IFormacion | undefined>(undefined)
    const [toDelete, setToDelete] = useState<IFormacion | undefined>(undefined)

    useEffect(() => {
        let active = true
        getFormaciones().then((data) => {
            if (active) { setFormaciones(data); setLoading(false) }
        })
        return () => { active = false }
    }, [])

    const fetchFormaciones = async () => {
        setLoading(true)
        setFormaciones(await getFormaciones())
        setLoading(false)
    }

    const filtered = useMemo(() =>
        formaciones.filter((f) =>
            f.nombre.toLowerCase().includes(search.toLowerCase()) ||
            f.institucion.toLowerCase().includes(search.toLowerCase())
        ), [formaciones, search])

    const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

    const handleSearch = (v: string) => { setSearch(v); setPage(0) }

    const handleHide = async (id: number) => { await updateFormacionVisible(id, false); fetchFormaciones() }
    const handleShow = async (id: number) => { await updateFormacionVisible(id, true); fetchFormaciones() }
    const handleToggleEnCurso = async (id: number, enCurso: boolean) => { await updateFormacionEnCurso(id, enCurso); fetchFormaciones() }

    const handleNuevo = () => { setEditing(undefined); setSheetOpen(true) }
    const handleEditar = (f: IFormacion) => { setEditing(f); setSheetOpen(true) }
    const handleSaved = () => { setSheetOpen(false); fetchFormaciones() }
    const handleDeleteConfirm = async () => {
        if (!toDelete) return
        await deleteFormacion(toDelete.id)
        setToDelete(undefined)
        fetchFormaciones()
    }

    const now = new Date()
    const completadas = formaciones.filter((f) => new Date(f.fecha_fin) < now).length
    const enCurso = formaciones.filter((f) => new Date(f.fecha_fin) >= now).length

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-headline-lg text-foreground">Formacion</h2>
                <p className="text-body-sm text-muted-foreground">Gestiona tu historial formativo.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard label="Total formaciones" value={formaciones.length} icon={<BookOpenIcon className="size-5 text-indigo-400" />} iconBg="rgba(99,102,241,0.18)" />
                <StatCard label="Completadas" value={completadas} icon={<CheckCircleIcon className="size-5 text-emerald-400" />} iconBg="rgba(34,197,94,0.15)" />
                <StatCard label="En curso" value={enCurso} icon={<LoaderIcon className="size-5 text-amber-400" />} iconBg="rgba(201,162,39,0.18)" />
            </div>

            <AdminTableShell
                search={search} onSearchChange={handleSearch}
                searchPlaceholder="Filtrar formaciones..."
                addLabel="Nueva formacion" onAdd={handleNuevo}
                page={page} pageSize={PAGE_SIZE}
                total={filtered.length} entityLabel="formaciones"
                onPrev={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
            >
                <FormacionTable formaciones={paginated} loading={loading} onEdit={handleEditar} onDelete={setToDelete} onHide={handleHide} onShow={handleShow} onToggleEnCurso={handleToggleEnCurso} />
            </AdminTableShell>

            <AdminFormSheet
                open={sheetOpen} onOpenChange={setSheetOpen} isEditing={Boolean(editing)}
                entity="formacion" feminine
            >
                <FormacionForm formacion={editing} onSaved={handleSaved} />
            </AdminFormSheet>

            <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => { if (!open) setToDelete(undefined) }}>
                <AlertDialogContent className="admin-theme dark">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar formacion</AlertDialogTitle>
                        <AlertDialogDescription>Esta accion no se puede deshacer. Se eliminara la formacion <strong>{toDelete?.nombre}</strong> permanentemente.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
