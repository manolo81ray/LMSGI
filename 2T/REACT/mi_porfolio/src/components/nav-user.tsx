import { useNavigate } from "react-router-dom"
import { LogOutIcon } from "lucide-react"

import { useAuth } from "@/context/AuthContext"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavUser() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut()
        navigate("/", { replace: true })
    }

    const initial = user?.email?.[0]?.toUpperCase() ?? "?"

    return (
        <SidebarMenu className="gap-1">
            <Separator className="mb-1 h-px bg-white/25" />
            {/* Fila de usuario */}
            <SidebarMenuItem>
                <div className="flex items-center gap-2 px-2 py-1.5">
                    <Avatar className="h-7 w-7 shrink-0 rounded-lg">
                        <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                            {initial}
                        </AvatarFallback>
                    </Avatar>
                    <span className="truncate text-xs text-muted-foreground">{user?.email ?? ""}</span>
                </div>
            </SidebarMenuItem>

            {/* Botón Cerrar Sesión */}
            <SidebarMenuItem>
                <SidebarMenuButton
                    onClick={handleLogout}
                    className="bg-destructive/10 text-destructive hover:bg-destructive/25 hover:text-destructive [&>svg]:text-destructive"
                >
                    <LogOutIcon />
                    <span>Cerrar Sesión</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
