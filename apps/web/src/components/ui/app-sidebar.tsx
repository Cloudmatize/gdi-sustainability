'use client'
import { ChevronDown, Cloud, CreditCard, Github, Keyboard, LifeBuoy, LogOut, Mail, MessageSquare, Plus, PlusCircle, Settings, User, UserPlus, Users } from "lucide-react"

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
import { routes } from "@/config/menuRoutes"
import Image from "next/image"
import { useState } from "react"
import { Button } from "./button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./dropdown-menu"


export function AppSidebar() {
  const [openRoute, setOpenRoute] = useState([0])

  const handleChangeOpenState = (route: {id: number, parent?: number}) => {
    if (!openRoute.includes(route.id)) {
      if (route.parent) {
        const routes = [route.id, route.parent]
        setOpenRoute(routes)
      } else {
        setOpenRoute([route.id])
      }
      return
    }
    setOpenRoute([0])
    return
  }

  return (
    <Sidebar>
        <SidebarHeader className="border-b py-4 gap-2 justify-between flex flex-row items-center">
          <div className="flex flex-row items-center gap-2">
            <Image src="./icon.svg" alt="GDI Sustainability" width={40} height={40}/>
            GDI Sustainability
            </div>
            <SidebarTrigger />
        </SidebarHeader>
      <SidebarContent className="py-2 flex flex-col gap-0 px-2">
        {routes?.map((route) => (
          route.children? (
          <Collapsible open={openRoute.includes(route.id)} className="group/collapsible">
            <SidebarGroup className="p-1 my-1">
              <SidebarGroupLabel asChild className="w-full p-0">
                <CollapsibleTrigger className="w-full p-0">
                <Button variant={`${openRoute.includes(route.id)? "outline": "ghost"}`} className={`${openRoute.includes(route.id)? "bg-teal-400 text-white mb-2 w-full font-bold": "mb-2 w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(route)}>
                  <route.icon/>
                  {route.title}
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
              <SidebarGroupContent className="pl-4 mt-2">
                <SidebarMenu className="border-l-2 px-2">
                  {route?.children?.map((children) => (
                    <SidebarMenuItem key={children.title}>
                      <SidebarMenuButton asChild  className={`${openRoute.includes(children.id)? "bg-teal-400 text-white mb-2 w-full font-bold": "mb-2 w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(children)}>
                        <a href={children.path}>
                          <children.icon />
                          <span>{children.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
            </Collapsible>):(
              <SidebarGroup className="p-1">
                <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton variant={`${openRoute.includes(route.id)? "outline": "default"}`} className={`${openRoute.includes(route.id)? "bg-teal-400 text-white w-full font-bold": " w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(route)}>
                  <route.icon/>
                  {route.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            )
        ))}
        
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
