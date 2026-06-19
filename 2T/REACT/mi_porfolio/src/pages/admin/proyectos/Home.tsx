import { useEffect, useMemo, useState } from "react"
import { BriefcaseIcon, EyeOffIcon, GlobeIcon } from "lucide-react"

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet"
import { AdminTableShell } from "@/components/admin/shared/AdminTableShell"
import { StatCard } from "@/components/admin/shared/StatCard"
import { ProyectoForm } from "@/components/admin/proyectos/ProyectoForm"
import { ProyectosTable } from "@/components/admin/proyectos/ProyectosTable"
import { getProyectos, deleteProyecto, updateProyectoVisible } from "@/model/api/backend/proyectos/apiProyectos"
import type { IProyectos } from "@/model/interfaces/proyectos/IProyectos"

const PAGE_SIZE = 10

export const ProyectosHome = () => {
    const [proyectos, setProyectos] = useState<IProyectos[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [editing, setEditing] = useState<IProyectos | undefined>(undefined)
    const [toDelete, setToDelete] = useState<IProyectos | undefined>(undefined)

    useEffect(() => {
        let active = true
        getProyectos().then((data) => {
            if (active) { setProyectos(data); setLoading(false) }
        })
        return () => { active = false }
    }, [])

    const fetchProyectos = async () => {
        setLoading(true)
        setProyectos(await getProyectos())
        setLoading(false)
    }

    const filtered = useMemo(() =>
        proyectos.filter((p) =>
            p.titulo.toLowerCase().includes(search.toLowerCase()) ||
            p.tecnologia.toLowerCase().includes(search.toLowerCase())
        ), [proyectos, search])

    const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

    const handleSearch = (v: string) => { setSearch(v); setPage(0) }

    const handleHide = async (id: number) => { await updateProyectoVisible(id, false); fetchProyectos() }
    const handleShow = async (id: number) => { await updateProyectoVisible(id, true); fetchProyectos() }

    const handleNuevo = () => { setEditing(undefined); setSheetOpen(true) }
    const handleEditar = (p: IProyectos) => { setEditing(p); setSheetOpen(true) }
    const handleSaved = () => { setSheetOpen(false); fetchProyectos() }
    const handleDeleteConfirm = async () => {
        if (!toDelete) return
        await deleteProyecto(toDelete.id)
        setToDelete(undefined)
        fetchProyectos()
    }

    const conEnlace = proyectos.filter((p) => p.url).length
    const sinEnlace = proyectos.filter((p) => !p.url).length

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-headline-lg text-foreground">Proyectos</h2>
                <p className="text-body-sm text-muted-foreground">Gestiona los proyectos de tu portfolio.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard label="Total proyectos" value={proyectos.length} icon={<BriefcaseIcon className="size-5 text-indigo-400" />} iconBg="rgba(99,102,241,0.18)" />
                <StatCard label="Con enlace público" value={conEnlace} icon={<GlobeIcon className="size-5 text-emerald-400" />} iconBg="rgba(34,197,94,0.15)" />
                <StatCard label="Sin enlace" value={sinEnlace} icon={<EyeOffIcon className="size-5 text-rose-400" />} iconBg="rgba(248,113,113,0.15)" />
            </div>

            <AdminTableShell
                search={search} onSearchChange={handleSearch}
                searchPlaceholder="Filtrar proyectos..."
                addLabel="Nuevo proyecto" onAdd={handleNuevo}
                page={page} pageSize={PAGE_SIZE}
                total={filtered.length} entityLabel="proyectos"
                onPrev={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
            >
                <ProyectosTable proyectos={paginated} loading={loading} onEdit={handleEditar} onDelete={setToDelete} onHide={handleHide} onShow={handleShow} />
            </AdminTableShell>

            <AdminFormSheet
                open={sheetOpen} onOpenChange={setSheetOpen} isEditing={Boolean(editing)}
                entity="proyecto"
            >
                <ProyectoForm proyecto={editing} onSaved={handleSaved} />
            </AdminFormSheet>

            <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => { if (!open) setToDelete(undefined) }}>
                <AlertDialogContent className="admin-theme dark">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar proyecto</AlertDialogTitle>
                        <AlertDialogDescription>Esta accion no se puede deshacer. Se eliminara el proyecto <strong>{toDelete?.titulo}</strong> permanentemente.</AlertDialogDescription>
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
