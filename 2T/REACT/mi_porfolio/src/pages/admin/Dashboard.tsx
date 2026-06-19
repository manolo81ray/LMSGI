import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BookOpenIcon, BriefcaseIcon, GraduationCapIcon, LanguagesIcon, WrenchIcon } from "lucide-react"

import { getCursos } from "@/model/api/backend/cursos/apiCursos"
import { getProyectos } from "@/model/api/backend/proyectos/apiProyectos"
import { getServicios } from "@/model/api/backend/servicios/apiServicios"
import { getFormaciones } from "@/model/api/backend/formacion/apiFormacion"
import { getLenguajes } from "@/model/api/backend/lenguajes/apiLenguajes"
import { RecentActivity } from "@/components/admin/dashboard/RecentActivity"

interface StatCard {
    title: string
    count: number | null
    icon: React.ReactNode
    href: string
    color: string
}

export const Dashboard = () => {
    const [counts, setCounts] = useState<Record<string, number | null>>({
        cursos: null,
        proyectos: null,
        servicios: null,
        formacion: null,
        lenguajes: null,
    })

    useEffect(() => {
        let active = true
        Promise.all([
            getCursos(),
            getProyectos(),
            getServicios(),
            getFormaciones(),
            getLenguajes(),
        ]).then(([cursos, proyectos, servicios, formaciones, lenguajes]) => {
            if (!active) return
            setCounts({
                cursos: cursos.length,
                proyectos: proyectos.length,
                servicios: servicios.length,
                formacion: formaciones.length,
                lenguajes: lenguajes.length,
            })
        })
        return () => { active = false }
    }, [])

    const cards: StatCard[] = [
        { title: "Cursos", count: counts.cursos, icon: <GraduationCapIcon className="size-6" />, href: "/admin/cursos", color: "text-blue-400" },
        { title: "Proyectos", count: counts.proyectos, icon: <BriefcaseIcon className="size-6" />, href: "/admin/proyectos", color: "text-purple-400" },
        { title: "Servicios", count: counts.servicios, icon: <WrenchIcon className="size-6" />, href: "/admin/servicios", color: "text-green-400" },
        { title: "Formacion", count: counts.formacion, icon: <BookOpenIcon className="size-6" />, href: "/admin/formacion", color: "text-amber-400" },
        { title: "Lenguajes", count: counts.lenguajes, icon: <LanguagesIcon className="size-6" />, href: "/admin/lenguajes", color: "text-pink-400" },
    ]

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-display-sm text-foreground">Bienvenido al panel</h1>
                <p className="text-body-md text-muted-foreground">Resumen de contenido en tu portfolio.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {cards.map((card) => (
                    <Link key={card.title} to={card.href} className="surface-card group flex flex-col items-center gap-3 p-5 text-center transition-all hover:border-primary/50 hover:shadow-lg">
                        <div className={`${card.color} flex items-center gap-2.5`}>
                            {card.icon}
                            <span className="text-base font-semibold uppercase tracking-wide text-foreground">{card.title}</span>
                        </div>
                        <p className="text-2xl font-semibold text-foreground">
                            {card.count === null ? (
                                <span className="inline-block h-7 w-9 animate-pulse rounded bg-muted" />
                            ) : card.count}
                        </p>
                    </Link>
                ))}
            </div>

            <RecentActivity />
        </div>
    )
}
