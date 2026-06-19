import * as React from "react"
import { Link } from "react-router-dom"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BriefcaseIcon,
  GraduationCapIcon,
  SparkleIcon,
  WrenchIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Manuel Rubio Garcia",
    email: "mrg06eoi@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Cursos",
      url: "/admin/cursos",
      icon: <GraduationCapIcon />,
    },
    {
      title: "Servicios",
      url: "/admin/servicios",
      icon: <WrenchIcon />,
    },
    {
      title: "Trabajos",
      url: "/admin/trabajos",
      icon: <BriefcaseIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="/admin">
                <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <SparkleIcon className="size-4!" />
                </span>
                <span className="text-base font-semibold text-sidebar-foreground">
                  Mi Portfolio Admin
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
