import { Link, useLocation } from "react-router-dom"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: React.ReactNode
    }[]
}) {
    const { pathname } = useLocation()

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-7 mt-2">
                <SidebarMenu>
                    {items.map((item) => {
                        const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`)
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    tooltip={item.title}
                                    className="h-10 md:h-11 text-sm md:text-base gap-3 px-3 [&_svg]:size-5 md:[&_svg]:size-6 [&_svg]:shrink-0 data-[active=true]:text-primary! data-[active=true]:font-semibold data-[active=true]:[&_svg]:text-primary"
                                >
                                    <Link to={item.url} className="flex items-center">
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
