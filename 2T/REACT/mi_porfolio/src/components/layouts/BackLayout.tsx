import { useEffect } from "react"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SiteHeader } from "@/components/ui/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Outlet } from "react-router-dom"

export function BackLayout() {
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
                    className="h-[calc(100svh/0.8)] min-h-[calc(100svh/0.8)] overflow-hidden"
                    style={{
                        "--sidebar-width": "320px",
                        "--header-height": "calc(var(--spacing) * 16)",
                    } as React.CSSProperties}
                >
                    <AppSidebar variant="inset" />
                    <SidebarInset className="overflow-hidden">
                        <SiteHeader />
                        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                            <div className="escala-admin mx-auto flex min-h-0 w-full max-w-360 flex-1 flex-col px-4 py-6 md:px-6 lg:py-10">
                                <Outlet />
                            </div>
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </TooltipProvider>
        </div>
    )
}
