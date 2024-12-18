import { Route, getRoutes } from "@/config/menuRoutes";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
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
  useSidebar,
} from "../ui/sidebar";
import { UserMenu } from "./user-menu";


export function MobileSideBar({ dict }: DictionaryContextType) {
  const [openRoute, setOpenRoute] = useState([''])
  const { open, toggleSidebar } = useSidebar()
  // const { getCurrentFlag } = useContext(FeatureFlagsContext);
  const routes = getRoutes(dict?.routes)

  const filteredRoutes = routes.filter((route) => {
    return true
    // if (!route.fliptFlag) return true;
    // const flag = getCurrentFlag(route.fliptFlag);
    // return flag?.enabled;
  });
  const handleChangeOpenState = (route: Route, children?: Route) => {
    if (children?.router_title) {
      if (route?.disabled) {
        return
      }
      if (children?.disabled) {
        return
      }
      const routes = [route.router_title, children?.router_title];
      setOpenRoute(routes);
      return
    }
    if (route?.disabled) {
      return
    }

    if (!openRoute.includes(route.router_title)) {
      setOpenRoute([route.router_title]);
      return;
    }

    // setOpenRoute(['']);
    return;
  };

  const handleToggleSideBar = () => {
    // setOpenRoute(['']);
    toggleSidebar();
  };

  return (
    <Sidebar className="justify-center items-center">
      <SidebarHeader className="border-b py-4 gap-2 justify-between flex flex-row items-center">
        <SidebarMenu className="p-0 m-0 items-center">
          <div
            className="bg-transparent hover:bg-none p-0 m-0 justify-center flex flex-row"
            onClick={handleToggleSideBar}
          >
            <img
              src={"/logos/logo-go-sustainability.png"}
              alt="GS Logo"
              className="w-40"
            />
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="py-2 flex flex-col gap-0 px-2 overflow-clip">
        {filteredRoutes?.map((route) =>
          route?.children ? (
            <Collapsible
              key={route.router_title}
              open={openRoute.includes(route.router_title)}
              className="group/collapsible"
            >
              <SidebarGroup className="p-1 my-1 flex flex-col items-center">
                <SidebarGroupLabel asChild className="w-full p-0">
                  <CollapsibleTrigger asChild className="w-full p-0">
                    <SidebarMenuButton
                      tooltip={route.title}
                      variant="default"
                      disabled={route?.disabled}
                      isActive={openRoute.includes(route.router_title)}
                      className={"px-2 transition-all duration-200 delay-150 flex font-normal flex-row justify-between items-center text-slate-600 w-full"}
                      onClick={(e) => handleChangeOpenState(route)}
                    >
                      <div className="flex flex-row gap-2 items-center">
                        <route.icon size={20} className="font-bold" />
                        <p
                          className={`${open ? "text-sm" : "text-[0px]"} delay-100 transition-all ease-in-out duration-200`}
                        >
                          {route.title}
                        </p>
                      </div>
                      {openRoute.includes(route.router_title) ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                <CollapsibleContent>
                  <SidebarGroupContent className="mt-2">
                    <SidebarMenu className="border-l-2 px-4">
                      {route?.children?.map((children) => (
                        <SidebarMenuItem key={children.title} className="max-w-56 w-56">
                          <Link href={children?.disabled ? '#' : children.path}>
                            <SidebarMenuButton disabled={children?.disabled} isActive={openRoute.includes(children.router_title)} className={"max-w-56 w-full"} onClick={(e) => handleChangeOpenState(route, children)}>
                              <children.icon />
                              <span>{children.title}</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ) : (
            <SidebarGroup className="p-1" key={route.router_title}>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem className="w-full">
                    <Link href={route?.disabled ? '#' : route.path} className="flex flex-row gap-2">
                      <SidebarMenuButton isActive={openRoute.includes(route.router_title)} variant="default" className={"w-full"} onClick={(e) => handleChangeOpenState(route)}>
                        <route.icon size={20} />
                        {route.title}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        )}
      </SidebarContent>
      <SidebarFooter className="border-t py-4 flex flex-row gap-4 px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu dict={dict?.sidebar.userMenu} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar >
  )
}
