import { LogOut, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";
import { useSession } from "next-auth/react";
import federatedLogout from "@/utils/auth/federated-logout";

export function UserMenu() {
  const { data } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="text-wrap  " tooltip={"Menu de usuário"}>
          <User2 />
          <p className=" w-full text-wrap">{data?.user?.name}</p>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel>{data?.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => federatedLogout()}
          className="cursor-pointer"
        >
          <LogOut />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
