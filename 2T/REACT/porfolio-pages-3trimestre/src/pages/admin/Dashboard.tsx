import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BriefcaseIcon, GraduationCapIcon, WrenchIcon } from "lucide-react"

import { getCursos } from "@/model/api/backend/apiCursos"
import { getServicios } from "@/model/api/backend/apiServicios"
import { getTrabajos } from "@/model/api/backend/apiTrabajos"

const stats = [
    {
        title: "Cursos",
        url: "/admin/cursos",
        icon: GraduationCapIcon,
        fetcher: getCursos,
    },
    {
        title: "Servicios",
        url: "/admin/servicios",
        icon: WrenchIcon,
        fetcher: getServicios,
    },
    {
        title: "Trabajos",
        url: "/admin/trabajos",
        icon: BriefcaseIcon,
        fetcher: getTrabajos,
    },
]

export const AdminDashboard = () => {
    const [counts, setCounts] = useState<Record<string, number | null>>({})

    useEffect(() => {
        stats.forEach(({ title, fetcher }) => {
            fetcher().then((data) => {
                setCounts((prev) => ({ ...prev, [title]: data.length }))
            })
        })
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-headline-md text-foreground">Vision general</h2>
                <p className="text-body-sm text-muted-foreground">
                    Resumen rapido del contenido publicado en tu portfolio.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map(({ title, url, icon: Icon }) => (
                    <Link
                        key={title}
                        to={url}
                        className="surface-card group flex flex-col gap-4 p-6 transition-colors hover:border-primary/40"
                    >
                        <div className="flex items-center justify-between">
                            <span className="flex size-10 items-center justify-center rounded-md bg-primary/15 text-primary">
                                <Icon className="size-5" />
                            </span>
                            <span className="text-label-md text-muted-foreground">Total</span>
                        </div>
                        <div>
                            <p className="text-display-lg text-foreground" style={{ fontSize: 40 }}>
                                {counts[title] ?? "-"}
                            </p>
                            <p className="text-body-md text-muted-foreground">{title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
