import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BookOpenIcon, BriefcaseIcon, GraduationCapIcon, LanguagesIcon, Share2Icon, WrenchIcon } from "lucide-react"

import { getActividadReciente } from "@/model/api/backend/dashboard/apiActividad"
import type { AccionActividad, IActividadItem, TipoActividad } from "@/model/interfaces/dashboard/IActividad"

const META: Record<TipoActividad, { label: string; color: string; icon: React.ReactNode }> = {
    curso: { label: "Curso", color: "text-blue-400", icon: <GraduationCapIcon className="size-5" /> },
    proyecto: { label: "Proyecto", color: "text-purple-400", icon: <BriefcaseIcon className="size-5" /> },
    servicio: { label: "Servicio", color: "text-green-400", icon: <WrenchIcon className="size-5" /> },
    formacion: { label: "Formación", color: "text-amber-400", icon: <BookOpenIcon className="size-5" /> },
    lenguaje: { label: "Lenguaje", color: "text-pink-400", icon: <LanguagesIcon className="size-5" /> },
    red: { label: "Red social", color: "text-cyan-400", icon: <Share2Icon className="size-5" /> },
}

const ACCION: Record<AccionActividad, { label: string; className: string }> = {
    creado: { label: "Añadido", className: "bg-emerald-500/15 text-emerald-300" },
    editado: { label: "Editado", className: "bg-blue-500/15 text-blue-300" },
    activado: { label: "Activado", className: "bg-emerald-500/15 text-emerald-300" },
    ocultado: { label: "Oculto", className: "bg-amber-500/15 text-amber-300" },
    borrado: { label: "Borrado", className: "bg-red-500/15 text-red-300" },
    "en curso": { label: "En curso", className: "bg-sky-500/15 text-sky-300" },
    completado: { label: "Completado", className: "bg-emerald-500/15 text-emerald-300" },
}

const rtf = new Intl.RelativeTimeFormat("es-ES", { numeric: "auto" })

const formatFecha = (iso: string | null) => {
    if (!iso) return "—"
    const fecha = new Date(iso)
    const diffMs = fecha.getTime() - Date.now()
    const diffDias = Math.round(diffMs / 86_400_000)

    if (Math.abs(diffMs) < 60_000) return "ahora mismo"

    if (Math.abs(diffDias) < 1) {
        const diffHoras = Math.round(diffMs / 3_600_000)
        if (Math.abs(diffHoras) < 1) return rtf.format(Math.round(diffMs / 60_000), "minute")
        return rtf.format(diffHoras, "hour")
    }
    if (Math.abs(diffDias) < 30) return rtf.format(diffDias, "day")
    return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", year: "numeric" }).format(fecha)
}

export const RecentActivity = () => {
    const [items, setItems] = useState<IActividadItem[] | null>(null)

    useEffect(() => {
        let active = true
        getActividadReciente().then((data) => {
            if (active) setItems(data)
        })
        return () => { active = false }
    }, [])

    return (
        <section className="surface-card flex w-full min-w-0 flex-col gap-4 p-5">
            <div>
                <h2 className="text-label-lg font-semibold text-foreground">Actividad reciente</h2>
                <p className="text-body-sm text-muted-foreground">Altas, ediciones, visibilidad y borrados en tu portfolio.</p>
            </div>

            {items === null ? (
                <ul className="flex flex-col divide-y divide-border">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <li key={i} className="flex items-center gap-3 py-3">
                            <span className="size-9 animate-pulse rounded-lg bg-muted" />
                            <span className="h-4 flex-1 animate-pulse rounded bg-muted" />
                            <span className="h-3 w-16 animate-pulse rounded bg-muted" />
                        </li>
                    ))}
                </ul>
            ) : items.length === 0 ? (
                <p className="py-6 text-center text-body-sm text-muted-foreground">Todavía no hay actividad.</p>
            ) : (
                <ul className="flex flex-col divide-y divide-border">
                    {items.map((item) => {
                        const meta = META[item.tipo]
                        const accion = ACCION[item.accion]
                        return (
                            <li key={`${item.tipo}-${item.id}`}>
                                <Link
                                    to={item.href}
                                    className="group -mx-2 flex items-center gap-3 rounded-md px-2 py-3 transition-colors hover:bg-accent/40"
                                >
                                    <span className={`${meta.color} flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/50`}>
                                        {meta.icon}
                                    </span>
                                    <span className="flex min-w-0 flex-1 flex-col">
                                        <span className="truncate text-body-md font-medium text-foreground">{item.titulo}</span>
                                        <span className="text-body-sm text-muted-foreground">{meta.label}</span>
                                    </span>
                                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${accion.className}`}>
                                        {accion.label}
                                    </span>
                                    <span className="hidden w-20 shrink-0 text-right text-body-sm text-muted-foreground sm:block">{formatFecha(item.fecha)}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </section>
    )
}
