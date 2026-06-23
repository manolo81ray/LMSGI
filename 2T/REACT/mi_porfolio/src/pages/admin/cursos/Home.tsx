import { useEffect, useMemo, useState } from "react"
import { BookOpenIcon, CoinsIcon, GraduationCapIcon } from "lucide-react"

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AdminFormSheet } from "@/components/admin/shared/AdminFormSheet"
import { AdminTableShell } from "@/components/admin/shared/AdminTableShell"
import { StatCard } from "@/components/admin/shared/StatCard"
import { CursoForm } from "@/components/admin/cursos/CursoForm"
import { CursosTable } from "@/components/admin/cursos/CursosTable"
import { getCursos, deleteCurso, updateCursoVisible, updateCursoEnCurso } from "@/model/api/backend/cursos/apiCursos"
import type { ICursos } from "@/model/interfaces/formacion/ICursos"

const PAGE_SIZE = 10

export const CursosHome = () => {
    const [cursos, setCursos] = useState<ICursos[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [editing, setEditing] = useState<ICursos | undefined>(undefined)
    const [toDelete, setToDelete] = useState<ICursos | undefined>(undefined)

    useEffect(() => {
        let active = true
        getCursos().then((data) => {
            if (active) { setCursos(data); setLoading(false) }
        })
        return () => { active = false }
    }, [])

    const fetchCursos = async () => {
        setLoading(true)
        setCursos(await getCursos())
        setLoading(false)
    }

    const filtered = useMemo(() =>
        cursos.filter((c) =>
            c.titulo.toLowerCase().includes(search.toLowerCase()) ||
            c.plataforma.toLowerCase().includes(search.toLowerCase())
        ), [cursos, search])

    const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

    const handleSearch = (v: string) => { setSearch(v); setPage(0) }

    const handleHide = async (id: number) => { await updateCursoVisible(id, false); fetchCursos() }
    const handleShow = async (id: number) => { await updateCursoVisible(id, true); fetchCursos() }
    const handleToggleEnCurso = async (id: number, enCurso: boolean) => { await updateCursoEnCurso(id, enCurso); fetchCursos() }

    const handleNuevo = () => { setEditing(undefined); setSheetOpen(true) }
    const handleEditar = (c: ICursos) => { setEditing(c); setSheetOpen(true) }
    const handleSaved = () => { setSheetOpen(false); fetchCursos() }
    const handleDeleteConfirm = async () => {
        if (!toDelete) return
        await deleteCurso(toDelete.id)
        setToDelete(undefined)
        fetchCursos()
    }

    const plataformas = new Set(cursos.map((c) => c.plataforma)).size
    const precioMedio = cursos.length
        ? Math.round(cursos.reduce((a, c) => a + c.precio, 0) / cursos.length)
        : 0

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-headline-lg text-foreground">Cursos</h2>
                <p className="text-body-sm text-muted-foreground">Gestiona los cursos de tu portfolio.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard label="Total cursos" value={cursos.length} icon={<GraduationCapIcon className="size-5 text-indigo-400" />} iconBg="rgba(99,102,241,0.18)" />
                <StatCard label="Plataformas" value={plataformas} icon={<BookOpenIcon className="size-5 text-emerald-400" />} iconBg="rgba(34,197,94,0.15)" />
                <StatCard label="Precio medio" value={`${precioMedio} €`} icon={<CoinsIcon className="size-5 text-amber-400" />} iconBg="rgba(201,162,39,0.18)" />
            </div>

            <AdminTableShell
                search={search} onSearchChange={handleSearch}
                searchPlaceholder="Filtrar cursos..."
                addLabel="Nuevo curso" onAdd={handleNuevo}
                page={page} pageSize={PAGE_SIZE}
                total={filtered.length} entityLabel="cursos"
                onPrev={() => setPage((p) => p - 1)}
                onNext={() => setPage((p) => p + 1)}
            >
                <CursosTable cursos={paginated} loading={loading} onEdit={handleEditar} onDelete={setToDelete} onHide={handleHide} onShow={handleShow} onToggleEnCurso={handleToggleEnCurso} />
            </AdminTableShell>

            <AdminFormSheet
                open={sheetOpen} onOpenChange={setSheetOpen} isEditing={Boolean(editing)}
                entity="curso"
            >
                <CursoForm curso={editing} onSaved={handleSaved} />
            </AdminFormSheet>

            <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => { if (!open) setToDelete(undefined) }}>
                <AlertDialogContent className="admin-theme dark">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar curso</AlertDialogTitle>
                        <AlertDialogDescription>Esta accion no se puede deshacer. Se eliminara el curso <strong>{toDelete?.titulo}</strong> permanentemente.</AlertDialogDescription>
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
