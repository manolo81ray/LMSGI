import { useEffect, useMemo, useState } from "react"
import { EyeIcon, EyeOffIcon, Share2Icon } from "lucide-react"

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet"
import { AdminTableShell } from "@/components/admin/shared/AdminTableShell"
import { StatCard } from "@/components/admin/shared/StatCard"
import { RedForm } from "@/components/admin/redes/RedForm"
import { RedesTable } from "@/components/admin/redes/RedesTable"
import { getRedes, deleteRed, updateRedVisible } from "@/model/api/backend/redes/apiRedes"
import type { IRedSocial } from "@/model/interfaces/contacto/IRedSocial"

const PAGE_SIZE = 10

export const RedesHome = () => {
    const [redes, setRedes] = useState<IRedSocial[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [editing, setEditing] = useState<IRedSocial | undefined>(undefined)
    const [toDelete, setToDelete] = useState<IRedSocial | undefined>(undefined)

    useEffect(() => {
        let active = true
        getRedes().then((data) => {
            if (active) { setRedes(data); setLoading(false) }
        })
        return () => { active = false }
    }, [])

    const fetchRedes = async () => {
        setLoading(true)
        setRedes(await getRedes())
        setLoading(false)
    }

    const filtered = useMemo(() =>
        redes.filter((r) =>
            (r.nombre ?? "").toLowerCase().includes(search.toLowerCase())
        ), [redes, search])

    const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

    const handleSearch = (v: string) => { setSearch(v); setPage(0) }

    const handleHide = async (id: number) => { await updateRedVisible(id, false); fetchRedes() }
    const handleShow = async (id: number) => { await updateRedVisible(id, true); fetchRedes() }

    const handleNuevo = () => { setEditing(undefined); setSheetOpen(true) }
    const handleEditar = (r: IRedSocial) => { setEditing(r); setSheetOpen(true) }
    const handleSaved = () => { setSheetOpen(false); fetchRedes() }
    const handleDeleteConfirm = async () => {
        if (!toDelete) return
        await deleteRed(toDelete.id)
        setToDelete(undefined)
        fetchRedes()
    }

    const visibles = redes.filter((r) => r.visible).length
    const ocultas = redes.filter((r) => !r.visible).length

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-headline-lg text-foreground">Redes sociales</h2>
                <p className="text-body-sm text-muted-foreground">Gestiona las redes sociales que aparecen en tu página de contacto.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard label="Total redes" value={redes.length} icon={<Share2Icon className="size-5 text-cyan-400" />} iconBg="rgba(34,211,238,0.18)" />
                <StatCard label="Visibles" value={visibles} icon={<EyeIcon className="size-5 text-emerald-400" />} iconBg="rgba(34,197,94,0.15)" />
                <StatCard label="Ocultas" value={ocultas} icon={<EyeOffIcon className="size-5 text-rose-400" />} iconBg="rgba(248,113,113,0.15)" />
            </div>

            <AdminTableShell
                search={search} onSearchChange={handleSearch}
                searchPlaceholder="Filtrar redes..."
                addLabel="Nueva red" onAdd={handleNuevo}
                page={page} pageSize={PAGE_SIZE}
                total={filtered.length} entityLabel="redes"
                onPrev={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
            >
                <RedesTable redes={paginated} loading={loading} onEdit={handleEditar} onDelete={setToDelete} onHide={handleHide} onShow={handleShow} />
            </AdminTableShell>

            <AdminFormSheet
                open={sheetOpen} onOpenChange={setSheetOpen} isEditing={Boolean(editing)}
                entity="red social" feminine
            >
                <RedForm red={editing} onSaved={handleSaved} />
            </AdminFormSheet>

            <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => { if (!open) setToDelete(undefined) }}>
                <AlertDialogContent className="admin-theme dark">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar red social</AlertDialogTitle>
                        <AlertDialogDescription>Esta accion no se puede deshacer. Se eliminara la red <strong>{toDelete?.nombre ?? toDelete?.id}</strong> permanentemente.</AlertDialogDescription>
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
