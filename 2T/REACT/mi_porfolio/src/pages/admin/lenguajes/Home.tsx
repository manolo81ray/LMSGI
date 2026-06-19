import { useEffect, useMemo, useState } from "react"
import { CodeIcon, TagIcon, TagsIcon } from "lucide-react"

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet"
import { AdminTableShell } from "@/components/admin/shared/AdminTableShell"
import { StatCard } from "@/components/admin/shared/StatCard"
import { LenguajeForm } from "@/components/admin/lenguajes/LenguajeForm"
import { LenguajesTable } from "@/components/admin/lenguajes/LenguajesTable"
import { getLenguajes, deleteLenguaje, updateLenguajeVisible } from "@/model/api/backend/lenguajes/apiLenguajes"
import type { ILenguajes } from "@/model/interfaces/home/ILenguajes"

const PAGE_SIZE = 10

export const LenguajesHome = () => {
    const [lenguajes, setLenguajes] = useState<ILenguajes[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [editing, setEditing] = useState<ILenguajes | undefined>(undefined)
    const [toDelete, setToDelete] = useState<ILenguajes | undefined>(undefined)

    useEffect(() => {
        let active = true
        getLenguajes().then((data) => {
            if (active) { setLenguajes(data); setLoading(false) }
        })
        return () => { active = false }
    }, [])

    const fetchLenguajes = async () => {
        setLoading(true)
        setLenguajes(await getLenguajes())
        setLoading(false)
    }

    const filtered = useMemo(() =>
        lenguajes.filter((l) =>
            (l.nombre ?? "").toLowerCase().includes(search.toLowerCase())
        ), [lenguajes, search])

    const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

    const handleSearch = (v: string) => { setSearch(v); setPage(0) }

    const handleHide = async (id: number) => { await updateLenguajeVisible(id, false); fetchLenguajes() }
    const handleShow = async (id: number) => { await updateLenguajeVisible(id, true); fetchLenguajes() }

    const handleNuevo = () => { setEditing(undefined); setSheetOpen(true) }
    const handleEditar = (l: ILenguajes) => { setEditing(l); setSheetOpen(true) }
    const handleSaved = () => { setSheetOpen(false); fetchLenguajes() }
    const handleDeleteConfirm = async () => {
        if (!toDelete) return
        await deleteLenguaje(toDelete.id_lenguaje)
        setToDelete(undefined)
        fetchLenguajes()
    }

    const conNombre = lenguajes.filter((l) => l.nombre).length
    const sinNombre = lenguajes.filter((l) => !l.nombre).length

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-headline-lg text-foreground">Lenguajes</h2>
                <p className="text-body-sm text-muted-foreground">Gestiona los lenguajes y tecnologias de tu portfolio.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard label="Total lenguajes" value={lenguajes.length} icon={<CodeIcon className="size-5 text-indigo-400" />} iconBg="rgba(99,102,241,0.18)" />
                <StatCard label="Con nombre" value={conNombre} icon={<TagsIcon className="size-5 text-emerald-400" />} iconBg="rgba(34,197,94,0.15)" />
                <StatCard label="Sin nombre" value={sinNombre} icon={<TagIcon className="size-5 text-rose-400" />} iconBg="rgba(248,113,113,0.15)" />
            </div>

            <AdminTableShell
                search={search} onSearchChange={handleSearch}
                searchPlaceholder="Filtrar lenguajes..."
                addLabel="Nuevo lenguaje" onAdd={handleNuevo}
                page={page} pageSize={PAGE_SIZE}
                total={filtered.length} entityLabel="lenguajes"
                onPrev={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
            >
                <LenguajesTable lenguajes={paginated} loading={loading} onEdit={handleEditar} onDelete={setToDelete} onHide={handleHide} onShow={handleShow} />
            </AdminTableShell>

            <AdminFormSheet
                open={sheetOpen} onOpenChange={setSheetOpen} isEditing={Boolean(editing)}
                entity="lenguaje"
            >
                <LenguajeForm lenguaje={editing} onSaved={handleSaved} />
            </AdminFormSheet>

            <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => { if (!open) setToDelete(undefined) }}>
                <AlertDialogContent className="admin-theme dark">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar lenguaje</AlertDialogTitle>
                        <AlertDialogDescription>Esta accion no se puede deshacer. Se eliminara el lenguaje <strong>{toDelete?.nombre ?? toDelete?.id_lenguaje}</strong> permanentemente.</AlertDialogDescription>
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
