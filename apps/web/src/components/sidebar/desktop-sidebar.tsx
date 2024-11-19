import { routes } from "@/config/menuRoutes";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { UserMenu } from "./user-menu";

export function DesktopSideBar() {
    const [openRoute, setOpenRoute] = useState([0])
    const { open, setOpen, toggleSidebar } = useSidebar()

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
    return (<Sidebar collapsible="icon" className="justify-center items-center">
        <SidebarHeader className="border-b py-4 gap-2 justify-between flex flex-row items-center">
            <SidebarMenu className="p-0 m-0">
                <SidebarMenuButton asChild tooltip={open ? "Clique para esconder" : "Clique para abrir"} className="bg-transparent hover:bg-none p-0 m-0 justify-center flex flex-row" onClick={handleToggleSideBar}>
                    <div className="flex flex-row gap-2 justify-center w-full items-center">
                        <Image src="./icon.svg" alt="GDI Sustainability" width={24} height={24} className="rounded-md" />
                        {open && (
                            <p className="overflow-hidden font-medium text-lg">
                                GDI Sustainability
                            </p>
                        )}</div>
                </SidebarMenuButton>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="py-2 flex flex-col gap-0 px-2 overflow-clip">
            {routes?.map((route) => (
                route.children ? (
                    <DropdownMenu key={route.id}>
                        <Collapsible open={openRoute.includes(route.id)} className="group/collapsible">
                            <SidebarGroup className="p-1 my-1 flex flex-col items-center">
                                {!open ?
                                    (<DropdownMenuTrigger>
                                        <SidebarMenuButton tooltip={route.title} variant="default" className={`text-slate-600 ${openRoute.includes(route.id) ? "bg-teal-400 text-white w-full font-bold" : "w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(route)}>
                                            <route.icon size={20} />
                                            {open && route.title}
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    ) :
                                    (
                                        <SidebarGroupLabel asChild className="w-full p-0">
                                            <CollapsibleTrigger className="w-full p-0">
                                                <SidebarMenuButton tooltip={route.title} variant="default" className={`flex flex-row justify-between items-center text-slate-600 ${openRoute.includes(route.id) ? "bg-teal-400 text-white x w-full font-bold" : "w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(route)}>
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <route.icon size={20} />
                                                        {open && route.title}
                                                    </div>
                                                    {openRoute.includes(route.id) ? <ChevronUp /> : <ChevronDown />}

                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                        </SidebarGroupLabel>)}

                                <DropdownMenuContent className="absolute left-[2rem] bottom-[0.2rem] flex flex-col justify-start">
                                    <DropdownMenuLabel className="flex flex-row items-center justify-start gap-2"><route.icon size={20} /> {route.title}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {route?.children?.map((children) => (
                                        <DropdownMenuItem key={children.title} className="p-0 m-0 hover:bg-teal-400 max-w-56 w-56">
                                            <SidebarMenuButton asChild variant="default" className={`max-w-56 text-slate-600 flex flex-row justify-start gap-2 ${openRoute.includes(children.id) ? "bg-teal-400 text-white w-full font-bold" : " w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`}>
                                                <a href={children.path}>
                                                    <children.icon />
                                                    <span>{children.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                                <CollapsibleContent>
                                    <SidebarGroupContent className="pl-4 mt-2">
                                        <SidebarMenu className="border-l-2 px-2">
                                            {route?.children?.map((children) => (
                                                <SidebarMenuItem key={children.title} className="max-w-56 w-56">
                                                    <SidebarMenuButton asChild className={`max-w-56 text-slate-600 ${openRoute.includes(children.id) ? "bg-teal-400 text-white mb-2 w-full font-bold" : "mb-2 w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(children)}>
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
                    </DropdownMenu>) : (
                    <SidebarGroup className="p-1" key={route.id}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem className="max-w-56 w-56">
                                    <SidebarMenuButton tooltip={route.title} variant="default" className={`max-w-56 text-slate-600 ${openRoute.includes(route.id) ? "bg-teal-400 text-white w-full font-bold" : " w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(route)}>
                                        <route.icon size={20} />
                                        {open && route.title}
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
    </Sidebar>
    )
}
