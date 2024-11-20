import { routes } from "@/config/menuRoutes";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "../ui/sidebar";
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
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={open ? "Clique para esconder" : "Clique para abrir"} className="bg-transparent hover:bg-none p-0 m-0 justify-center flex flex-row duration-300" onClick={handleToggleSideBar}>
                        <div className="flex flex-row gap-2 justify-center w-full items-center">
                            <Image src="./icon.svg" alt="GDI Sustainability" width={24} height={24} className={`${!open ? 'w-5' : 'w-5'} rounded-md `} />
                            <p className={`${open ? 'text-lg' : 'text-[0px]'} font-medium transition-all ease-in-out delay-150 duration-1000 overflow-hidden`}>
                                GDI Sustainability
                            </p>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="py-2 flex flex-col gap-0 px-2 overflow-clip">
            {routes?.map((route) => (
                route.children ? (
                    <DropdownMenu key={route.id}>
                        <Collapsible open={openRoute.includes(route.id)} className="group/collapsible">
                            <SidebarGroup className="p-1 my-1 flex flex-col items-center">
                                <SidebarGroupContent>
                                    {!open ?
                                        (<DropdownMenuTrigger>
                                            <SidebarMenuButton tooltip={route.title} variant="default" className={`text-slate-600 font-normal ${openRoute.includes(route.id) ? "bg-teal-400 text-white w-full font-bold" : "w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(route)}>
                                                <route.icon size={20} className="font-bold" />
                                                {/* {open && route.title} */}
                                                <p className={`${open ? 'text-sm' : 'text-[0px]'} delay-100 transition-all ease-in-out duration-400`}>
                                                    {route.title}
                                                </p>
                                            </SidebarMenuButton>
                                        </DropdownMenuTrigger>
                                        ) :
                                        (
                                            <SidebarGroupLabel asChild className="w-full p-0">
                                                <CollapsibleTrigger className="w-full p-0">
                                                    <SidebarMenuButton tooltip={route.title} variant="default" className={`transition-all delay-150 flex font-normal flex-row justify-between items-center text-slate-600 ${openRoute.includes(route.id) ? "bg-teal-400 text-white w-full font-bold" : "w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(route)}>
                                                        <div className="flex flex-row gap-2 items-center">
                                                            <route.icon size={20} className="font-bold" />
                                                            {/* {open && route.title} */}
                                                            <p className={`${open ? 'text-sm' : 'text-[0px]'} delay-100 transition-all ease-in-out duration-400`}>
                                                                {route.title}
                                                            </p>
                                                        </div>
                                                        {openRoute.includes(route.id) ? <ChevronUp /> : <ChevronDown />}

                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                            </SidebarGroupLabel>)}

                                    <DropdownMenuContent className="absolute left-[2rem] bottom-[0.2rem] flex flex-col gap-2 justify-start">
                                        <DropdownMenuLabel className="flex flex-row items-center justify-start gap-2 text-slate-600"><route.icon size={20} /> {route.title}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {route?.children?.map((children) => (
                                            <DropdownMenuItem key={children.title} className="p-0 m-0 hover:bg-teal-400 max-w-56 w-56 gap-2">
                                                <SidebarMenuSubButton asChild className={`max-w-56 text-slate-600 flex flex-row justify-start gap-2 ${openRoute.includes(children.id) ? "bg-teal-400 text-white w-full font-bold" : " w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`}>
                                                    <a href={children.path}>
                                                        <children.icon size={20} />
                                                        <span>{children.title}</span>
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                    <CollapsibleContent>
                                        <SidebarMenuSub className="py-2">
                                            {route?.children?.map((children) => (
                                                <SidebarMenuSubItem key={children.title} className="max-w-48 w-48">
                                                    <SidebarMenuSubButton asChild className={`max-w-48 font-normal text-slate-600 ${openRoute.includes(children.id) ? "bg-teal-400 text-white mb-2 w-full font-bold" : "mb-2 w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(children)}>
                                                        <Link href={children.path} className="text-slate-600">
                                                            <children.icon size={20} className="text-slate-600" />
                                                            <span className="duration-200">{children.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem >
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </Collapsible>
                    </DropdownMenu>) : (
                    <SidebarGroup className="p-1" key={route.id}>
                        <SidebarGroupContent>
                            <SidebarMenu className="flex flex-col">
                                <SidebarMenuItem className="max-w-56 w-56">
                                    <Link href={route.path} >
                                        <SidebarMenuButton tooltip={route.title} variant="default" className={`flex flex-row flex-nowrap justify-start transition-[width] min-h-8 max-h-8 h-8 ease-in-out delay-150 duration-400 max-w-56 font-normal text-slate-600 ${openRoute.includes(route.id) ? "bg-teal-400 text-white w-full font-bold" : " w-full hover:bg-teal-400 hover:text-white hover:font-bold"}`} onClick={(e) => handleChangeOpenState(route)}>
                                            <route.icon size={20} className={`${open ? 'size-5' : 'size-5'} transition-all delay-150 duration-400 ease-in-out`} />
                                            <p className={`${open ? 'text-sm' : 'text-[0px]'} delay-100 transition-all ease-in-out duration-400`}>
                                                {route.title}
                                            </p>
                                        </SidebarMenuButton>
                                    </Link>
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
