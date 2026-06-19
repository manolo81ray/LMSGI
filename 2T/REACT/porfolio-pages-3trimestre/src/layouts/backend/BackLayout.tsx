import { useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Outlet } from "react-router-dom"

// Layout del backend (/admin). Aplica el design system "Modern Portfolio
// Executive": superficie oscura, sidebar fijo de 280px y un lienzo fluido
// con un ancho maximo de 1440px para que las tablas no se desborden en
// monitores ultra anchos.
export function BackLayout() {
    // Los componentes con portal (Sheet, AlertDialog, Tooltip...) montan su
    // contenido directamente en document.body, fuera de este arbol. Para que
    // tambien hereden la paleta del admin, aplicamos las mismas clases al
    // body mientras el panel esta activo y las retiramos al desmontar.
    useEffect(() => {
        document.body.classList.add("admin-theme", "dark")
        return () => {
            document.body.classList.remove("admin-theme", "dark")
        }
    }, [])

    return (
        <div className="admin-theme dark">
            <TooltipProvider>
                <SidebarProvider
                    style={
                        {
                            "--sidebar-width": "280px",
                            "--header-height": "calc(var(--spacing) * 16)",
                        } as React.CSSProperties
                    }
                >
                    <AppSidebar variant="inset" />
                    <SidebarInset>
                        <SiteHeader />
                        <div className="flex flex-1 flex-col">
                            <div className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 md:px-6 lg:py-10">
                                <Outlet />
                            </div>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </TooltipProvider>
        </div>
    )
}
