import { Route, getRoutes } from "@/config/menuRoutes";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../ui/sidebar";
import { UserMenu } from "./user-menu";


export function DesktopSideBar({ dict }: DictionaryContextType) {
  const { open, toggleSidebar, openRoute, setOpenRoute } = useSidebar();
  // const { getCurrentFlag } = useContext(FeatureFlagsContext);
  const routes = getRoutes(dict.routes)

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
    <Sidebar collapsible="icon" className="justify-center items-center">
      <SidebarHeader className="border-b h-[65px]  gap-2 justify-center flex flex-col items-center w-full">
        <SidebarMenu className="p-0 m-0 flex flex-col justify-center items-center">
          <SidebarMenuItem className="flex flex-col justify-center items-center w-full">
            <button
              className="bg-transparent p-0 m-0 justify-center flex flex-row cursor-pointer"
              onClick={handleToggleSideBar}
              type="submit"
            >
              <div
                className={`flex  h-full w-full flex-row gap-2  items-center ${open ? " justify-center" : " justify-start"}`}
              >
                <img
                  src={`/logos/logo-go-sustainability${open ? "" : "-smaller"}.png`}
                  alt="GS Logo"
                  className="w-40  "
                />
              </div>
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="py-2 flex flex-col gap-0 px-2 overflow-clip">
        {filteredRoutes?.map((route) =>
          route?.children ? (
            <DropdownMenu key={route.router_title}>
              <Collapsible
                open={openRoute.includes(route.router_title)}
                className="group/collapsible"
              >
                <SidebarGroup className="p-1 my-1 flex flex-col items-center">
                  <SidebarGroupContent>
                    {!open ? (
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                          tooltip={route.title}
                          variant="default"
                          className={`w-full transition-width ease-in-out font-normal ${openRoute.includes(route.router_title)}`}
                          onClick={(e) => handleChangeOpenState(route)}
                          disabled={route?.disabled}
                        >
                          <route.icon size={20} className="font-bold" />
                          <p
                            className={`${open ? "text-sm" : "text-[0px]"} transition-width ease-in-out`}
                          >
                            {route.title}
                          </p>
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                    ) : (
                      <SidebarGroupLabel asChild className="w-full p-0">
                        <CollapsibleTrigger asChild className="w-full p-0">
                          <SidebarMenuButton
                            tooltip={route.title}
                            variant="default"
                            className={`w-full px-2 transition-all delay-150 flex font-normal flex-row justify-between items-center text-slate-600 ${openRoute.includes(route.router_title) ? "bg-teal-400 text-white" : ""}`}
                            onClick={(e) => handleChangeOpenState(route)}
                            disabled={route?.disabled}
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
                    )}

                    <DropdownMenuContent className="absolute left-[2rem] bottom-[0.2rem] flex flex-col gap-2 justify-start">
                      <DropdownMenuLabel className="flex flex-row items-center justify-start gap-2 text-slate-600">
                        <route.icon size={20} /> {route.title}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {route?.children?.map((children) => (
                        <DropdownMenuItem
                          key={children.title}
                          className="p-0 m-0  max-w-56 w-56 gap-2"
                        >
                          <SidebarMenuSubButton
                            asChild
                            disabled={children?.disabled}
                            isActive={openRoute.includes(children.router_title)}
                            className={"max-w-56 flex flex-row justify-start gap-2 w-full"}
                            onClick={(e) => handleChangeOpenState(route, children)}
                          >
                            <Link
                              href={children?.disabled ? '#' : children.path}
                              className=""
                            >
                              <children.icon size={20} />
                              <span>{children.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                    <CollapsibleContent>
                      <SidebarMenuSub className="py-2">
                        {route?.children?.map((children) => (
                          <SidebarMenuSubItem
                            key={children.title}
                            className="max-w-48 w-48"
                          >
                            <SidebarMenuSubButton
                              tooltip={children.title}
                              asChild
                              isActive={openRoute.includes(children.router_title)}
                              className={"max-w-48 mb-2 w-full"}
                              onClick={(e) => handleChangeOpenState(route, children)}
                              disabled={children?.disabled}
                            >
                              <Link
                                href={children?.disabled ? '#' : children.path}
                                className=""
                              >
                                <children.icon
                                  size={20}
                                />
                                <span>
                                  {children.title}
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarGroupContent>
                </SidebarGroup>
              </Collapsible>
            </DropdownMenu>
          ) : (
            <SidebarGroup className="p-1" key={route.router_title}>
              <SidebarGroupContent>
                <SidebarMenu className="flex flex-col">
                  <SidebarMenuItem className="max-w-56 w-56">
                    <Link href={route?.disabled ? '#' : route.path}>
                      <SidebarMenuButton
                        tooltip={route.title}
                        variant="default"
                        disabled={route?.disabled}
                        isActive={openRoute.includes(route.router_title)}
                        onClick={(e) => handleChangeOpenState(route)}
                      >
                        <route.icon
                          size={20}
                          className={`${open ? "size-5" : "size-5"} transition-width delay-150 duration-200 ease-in-out`}
                        />
                        <p
                          className={`${open ? "text-sm" : "text-[0px]"} transition-width delay-100 ease-in-out duration-200`}
                        >
                          {route.title}
                        </p>
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
            <UserMenu dict={dict?.sidebar?.userMenu} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
