'use client'
import { Building, Bus, ChevronDown, Cloud, CreditCard, Github, Keyboard, LifeBuoy, LogOut, Mail, MapIcon, MessageSquare, Plus, PlusCircle, Search, Settings, User, UserPlus, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar"
import Image from "next/image"
import { useState } from "react"
import { Button } from "./button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./dropdown-menu"

// Menu items.
const items = [
  {
    title: "Visão Geral",
    url: "/",
    icon: Home,
  },
  {
    title: "Emissão de Transporte",
    url: "#",
    icon: Bus,
  },
  {
    title: "Emissão de Edifícios",
    url: "#",
    icon: Building,
  },
  {
    title: "Rastreador de Metas",
    url: "#",
    icon: Search,
  },
  {
    title: "Mapa",
    url: "#",
    icon: MapIcon,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
        <SidebarHeader className="border-b py-4 gap-2 justify-between flex flex-row items-center px-2">
          <div className="flex flex-row items-center gap-2">
            <Image src="./icon.svg" alt="GDI Sustainability" width={40} height={40}/>
            GDI Sustainability
            </div>
            <SidebarTrigger />
        </SidebarHeader>
      <SidebarContent className="px-2">
        <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
            Emissões de CO2
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild  className="hover:bg-teal-400 hover:text-white hover:font-bold">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter className="border-t py-4 flex flex-row gap-4 px-2">
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full flex justify-start"><Image src="/jorjinho.png" width={20} height={20} alt="Jorjinho" className="rounded-full"/>
        <p>Jorjinho</p></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle />
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
