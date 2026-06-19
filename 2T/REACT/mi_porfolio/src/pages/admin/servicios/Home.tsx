import { useEffect, useMemo, useState } from "react"
import { CoinsIcon, LayoutGridIcon, WrenchIcon } from "lucide-react"

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet"
import { AdminTableShell } from "@/components/admin/shared/AdminTableShell"
import { StatCard } from "@/components/admin/shared/StatCard"
import { ServicioForm } from "@/components/admin/servicios/ServicioForm"
import { ServiciosTable } from "@/components/admin/servicios/ServiciosTable"
import { getServicios, deleteServicio, updateServicioVisible } from "@/model/api/backend/servicios/apiServicios"
import type { IServicios } from "@/model/interfaces/servicios/IServicios"

const PAGE_SIZE = 10

export const ServiciosHome = () => {
    const [servicios, setServicios] = useState<IServicios[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [editing, setEditing] = useState<IServicios | undefined>(undefined)
    const [toDelete, setToDelete] = useState<IServicios | undefined>(undefined)

    useEffect(() => {
        let active = true
        getServicios().then((data) => {
            if (active) { setServicios(data); setLoading(false) }
        })
        return () => { active = false }
    }, [])

    const fetchServicios = async () => {
        setLoading(true)
        setServicios(await getServicios())
        setLoading(false)
    }

    const filtered = useMemo(() =>
        servicios.filter((s) =>
            s.nombre.toLowerCase().includes(search.toLowerCase()) ||
            s.tipo.toLowerCase().includes(search.toLowerCase())
        ), [servicios, search])

    const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

    const handleSearch = (v: string) => { setSearch(v); setPage(0) }

    const handleHide = async (id: number) => { await updateServicioVisible(id, false); fetchServicios() }
    const handleShow = async (id: number) => { await updateServicioVisible(id, true); fetchServicios() }

    const handleNuevo = () => { setEditing(undefined); setSheetOpen(true) }
    const handleEditar = (s: IServicios) => { setEditing(s); setSheetOpen(true) }
    const handleSaved = () => { setSheetOpen(false); fetchServicios() }
    const handleDeleteConfirm = async () => {
        if (!toDelete) return
        await deleteServicio(toDelete.id)
        setToDelete(undefined)
        fetchServicios()
    }

    const precioMedio = servicios.length
        ? Math.round(servicios.reduce((a, s) => a + s.precio, 0) / servicios.length)
        : 0
    const tipos = new Set(servicios.map((s) => s.tipo)).size

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-headline-lg text-foreground">Servicios</h2>
                <p className="text-body-sm text-muted-foreground">Gestiona los servicios que ofreces.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard label="Total servicios" value={servicios.length} icon={<WrenchIcon className="size-5 text-indigo-400" />} iconBg="rgba(99,102,241,0.18)" />
                <StatCard label="Precio medio" value={`${precioMedio} €`} icon={<CoinsIcon className="size-5 text-amber-400" />} iconBg="rgba(201,162,39,0.18)" />
                <StatCard label="Tipos distintos" value={tipos} icon={<LayoutGridIcon className="size-5 text-emerald-400" />} iconBg="rgba(34,197,94,0.15)" />
            </div>

            <AdminTableShell
                search={search} onSearchChange={handleSearch}
                searchPlaceholder="Filtrar servicios..."
                addLabel="Nuevo servicio" onAdd={handleNuevo}
                page={page} pageSize={PAGE_SIZE}
                total={filtered.length} entityLabel="servicios"
                onPrev={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
            >
                <ServiciosTable servicios={paginated} loading={loading} onEdit={handleEditar} onDelete={setToDelete} onHide={handleHide} onShow={handleShow} />
            </AdminTableShell>

            <AdminFormSheet
                open={sheetOpen} onOpenChange={setSheetOpen} isEditing={Boolean(editing)}
                entity="servicio"
            >
                <ServicioForm servicio={editing} onSaved={handleSaved} />
            </AdminFormSheet>

            <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => { if (!open) setToDelete(undefined) }}>
                <AlertDialogContent className="admin-theme dark">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar servicio</AlertDialogTitle>
                        <AlertDialogDescription>Esta accion no se puede deshacer. Se eliminara el servicio <strong>{toDelete?.nombre}</strong> permanentemente.</AlertDialogDescription>
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
