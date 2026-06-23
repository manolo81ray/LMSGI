import { Link } from "react-router-dom"
import {
    BookOpenIcon,
    BriefcaseIcon,
    GraduationCapIcon,
    WrenchIcon,
    LanguagesIcon
} from "lucide-react"

import logoMrg from "@/assets/logo_mrg.png"
import { NavMain } from "@/components/ui/nav-main"
import { NavUser } from "@/components/ui/nav-user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"

const navItems = [
    { title: "Cursos", url: "/admin/cursos", icon: <GraduationCapIcon /> },
    { title: "Proyectos", url: "/admin/proyectos", icon: <BriefcaseIcon /> },
    { title: "Servicios", url: "/admin/servicios", icon: <WrenchIcon /> },
    { title: "Formacion", url: "/admin/formacion", icon: <BookOpenIcon /> },
    { title: "Lenguajes", url: "/admin/lenguajes", icon: <LanguagesIcon /> }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" className="h-[calc(100svh/0.8)]" {...props}>
            <SidebarHeader className="pb-0">
                <Link
                    to="/admin"
                    className="flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-sidebar-accent"
                >
                    <Avatar className="size-13 shrink-0 overflow-hidden rounded-lg bg-[#0a1730]">
                        <AvatarImage src={logoMrg} alt="Manolo R.G." className="object-contain p-0.5" />
                        <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
                            MR
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-sidebar-foreground">Manolo R.G.</p>
                        <p className="truncate text-xs text-muted-foreground">Panel de Administración</p>
                    </div>
                </Link>
                <Separator className="mt-1 -mx-2 h-0.5 w-auto bg-amber-400" />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>
            <SidebarFooter className="pt-0">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
