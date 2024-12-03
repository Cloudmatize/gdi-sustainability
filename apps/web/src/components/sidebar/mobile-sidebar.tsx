import { routes } from "@/config/menuRoutes";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { UserMenu } from "./user-menu";

export function MobileSideBar() {
    const [openRoute, setOpenRoute] = useState([0])
    const { open, toggleSidebar } = useSidebar()

    const handleChangeOpenState = (route: { id: number, parent?: number }) => {
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

    const handleToggleSideBar = () => {
        setOpenRoute([0])
        toggleSidebar()
    }

    return (<Sidebar className="justify-center items-center">
        <SidebarHeader className="border-b py-4 gap-2 justify-between flex flex-row items-center">
            <SidebarMenu className="p-0 m-0">
                <SidebarMenuButton asChild tooltip={open ? "Clique para esconder" : "Clique para abrir"} className="bg-transparent hover:bg-none p-0 m-0 justify-center flex flex-row" onClick={handleToggleSideBar}>
                  <img
                    src={`/logos/logo-go-sustainability.png`}
                    alt="GS Logo"
                    className="w-40"
                    />
                </SidebarMenuButton>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="py-2 flex flex-col gap-0 px-2 overflow-clip">
            {routes?.map((route) => (
                route.children ? (
                    <Collapsible key={route.id} open={openRoute.includes(route.id)} className="group/collapsible">
                        <SidebarGroup className="p-1 my-1 flex flex-col items-center">
                            <SidebarGroupLabel asChild className="w-full p-0">
                                <CollapsibleTrigger asChild className="w-full p-0">
                                    <SidebarMenuButton tooltip={route.title} variant="default" className={`px-2 transition-all duration-200 delay-150 flex font-normal flex-row justify-between items-center text-slate-600 ${openRoute.includes(route.id) ? "bg-teal-400 text-white w-full font-bold" : "w-full "}`} onClick={(e) => handleChangeOpenState(route)}>
                                        <div className="flex flex-row gap-2 items-center">
                                            <route.icon size={20} className="font-bold" />
                                            <p className={`${open ? 'text-sm' : 'text-[0px]'} delay-100 transition-all ease-in-out duration-200`}>
                                                {route.title}
                                            </p>
                                        </div>
                                        {openRoute.includes(route.id) ? <ChevronUp /> : <ChevronDown />}
                                    </SidebarMenuButton>
                                </CollapsibleTrigger></SidebarGroupLabel>

                            <CollapsibleContent>
                                <SidebarGroupContent className="mt-2">
                                    <SidebarMenu className="border-l-2 px-4">
                                        {route?.children?.map((children) => (
                                            <SidebarMenuItem key={children.title} className="max-w-56 w-56">
                                                <SidebarMenuButton asChild className={`max-w-56  w-full ${openRoute.includes(children.id) ? "bg-teal-400 text-white font-bold" : ""}`} onClick={(e) => handleChangeOpenState(children)}>
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
                    </Collapsible>
                ) : (
                    <SidebarGroup className="p-1" key={route.id}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem className="w-full">
                                    <SidebarMenuButton variant="default" className={`w-full text-slate-600  ${openRoute.includes(route.id) ? "bg-teal-400 text-white font-bold" : ""}`} onClick={(e) => handleChangeOpenState(route)}>
                                        <route.icon size={20} />
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
            <SidebarMenu>
                <SidebarMenuItem>
                    <UserMenu />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar >
    )
}
