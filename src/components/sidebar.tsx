"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, Menu } from "lucide-react"

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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  const clientServiceLinks = [
    { href: "/client-service/permanent-staffing", label: "Permanent Staffing" },
    { href: "/client-service/early-stage-professional", label: "Early Stage Professional" },
    { href: "/client-service/assessment", label: "Assessment" },
    { href: "/client-service/talent-workforce", label: "Talent Workforce" },
    { href: "/client-service/high-volume-hourly-rating", label: "High Volume Hourly Rating" },
  ]

  const candidateServiceLinks = [
    { href: "/candidate-service/permanent-workers", label: "Permanent Workers" },
    { href: "/candidate-service/temporary-worker", label: "Temporary Worker" },
    { href: "/candidate-service/temporary-worker-system", label: "Temporary Worker System" },
  ]

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/career-education", label: "Career Education" },
    { href: "/find-talent", label: "Find Talent" },
    { href: "/find-jobs", label: "Find Jobs" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Us" },
  ]

  const isClientServiceActive = pathname.startsWith("/client-service")
  const isCandidateServiceActive = pathname.startsWith("/candidate-service")

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="fixed right-4 top-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}

      <Sidebar
        className={`fixed inset-y-0 right-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        variant="floating"
      >
        <SidebarHeader className="flex items-center justify-between p-4">
          <div className="text-lg font-bold text-primary">Copora</div>
          <button onClick={() => setIsOpen(false)} className="rounded-full p-1 hover:bg-gray-100">
            <ChevronRight className="h-5 w-5" />
          </button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainLinks.map((link) => (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton asChild isActive={pathname === link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Client Services</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isClientServiceActive}>
                    <span>Client Services</span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {clientServiceLinks.map((link) => (
                      <SidebarMenuSubItem key={link.href}>
                        <SidebarMenuSubButton asChild isActive={pathname === link.href}>
                          <Link href={link.href}>{link.label}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Candidate Services</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isCandidateServiceActive}>
                    <span>Candidate Services</span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {candidateServiceLinks.map((link) => (
                      <SidebarMenuSubItem key={link.href}>
                        <SidebarMenuSubButton asChild isActive={pathname === link.href}>
                          <Link href={link.href}>{link.label}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
