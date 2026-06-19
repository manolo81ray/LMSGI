import { useLocation } from "react-router-dom"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
    "/admin": {
        title: "Panel de administracion",
        subtitle: "Vision general del portfolio",
    },
    "/admin/cursos": {
        title: "Cursos",
        subtitle: "Gestiona la formacion que aparece en tu portfolio",
    },
    "/admin/proyectos": {
        title: "Proyectos",
        subtitle: "Gestiona los proyectos de tu portfolio",
    },
    "/admin/servicios": {
        title: "Servicios",
        subtitle: "Gestiona los servicios que ofreces",
    },
    "/admin/formacion": {
        title: "Formacion",
        subtitle: "Gestiona tu historial academico y profesional",
    },
    "/admin/lenguajes": {
        title: "Lenguajes",
        subtitle: "Gestiona los lenguajes y tecnologias que dominas",
    },
}

export function SiteHeader() {
    const { pathname } = useLocation()
    const page = PAGE_TITLES[pathname] ?? {
        title: "Panel de administracion",
        subtitle: "",
    }

    return (
        <header className="sticky top-0 z-30 flex h-(--header-height) shrink-0 items-center gap-2 border-b border-border bg-background/80 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <div className="flex flex-col">
                    <h1 className="text-headline-sm leading-tight text-foreground">
                        {page.title}
                    </h1>
                    {page.subtitle && (
                        <p className="truncate text-body-sm text-muted-foreground">{page.subtitle}</p>
                    )}
                </div>
            </div>
        </header>
    )
}
