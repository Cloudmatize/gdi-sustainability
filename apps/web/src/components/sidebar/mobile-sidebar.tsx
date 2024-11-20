import { routes } from "@/config/menuRoutes";
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
                    <div className="flex flex-row gap-2 justify-center w-full items-center">
                        <Image src="./icon.svg" alt="GDI Sustainability" width={open ? 50 : 30} height={40} className="rounded-md h-5 w-5 cursor-none" />
                        <p className="overflow-hidden font-medium text-lg">
                            GDI Sustainability
                        </p>
                    </div>
                </SidebarMenuButton>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="py-2 flex flex-col gap-0 px-2 overflow-clip">
            {routes?.map((route) => (
                route.children ? (
                    <Collapsible key={route.id} open={openRoute.includes(route.id)} className="group/collapsible">
                        <SidebarGroup className="p-1 my-1 flex flex-col items-center">
                            <SidebarGroupLabel asChild className="w-full p-0">
                                <CollapsibleTrigger className="w-full p-0">

                                    <SidebarMenuButton variant="default" className={`${openRoute.includes(route.id) ? "bg-teal-400 text-white  w-full font-bold" : " w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(route)}>
                                        <route.icon size={20} />
                                        {route.title}
                                    </SidebarMenuButton>
                                </CollapsibleTrigger></SidebarGroupLabel>

                            <CollapsibleContent>
                                <SidebarGroupContent className="mt-2">
                                    <SidebarMenu className="border-l-2 px-4">
                                        {route?.children?.map((children) => (
                                            <SidebarMenuItem key={children.title} className="max-w-56 w-56">
                                                <SidebarMenuButton asChild className={`max-w-56 ${openRoute.includes(children.id) ? "bg-teal-400 text-white  w-full font-bold" : " w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(children)}>
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
                                <SidebarMenuItem className="max-w-56 w-56">
                                    <SidebarMenuButton variant="default" className={`max-w-56 ${openRoute.includes(route.id) ? "bg-teal-400 text-white w-full font-bold" : " w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(route)}>
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
