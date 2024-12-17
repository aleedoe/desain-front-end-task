"use client"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

// This is sample data.
const data = {
  versions: ["1.0.1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboardv1",
        },
      ],
    },
    {
      title: "Penduduk",
      url: "#",
      items: [
        {
          title: "Master Penduduk",
          url: "/dashboardv1/masterPenduduk",
        },
        {
          title: "Pendaftaran Penduduk",
          url: "/dashboardv1/reqPenduduk",
        },
        {
          title: "Perpindahan Penduduk",
          url: "/dashboardv1/reqPerPenduduk",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex flex-row justify-start gap-3 items-center">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">Simple App</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Create a SidebarGroup for each parent. */}
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  // Periksa apakah URL item sama dengan path saat ini
                  const isActive = pathname === item.url

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
