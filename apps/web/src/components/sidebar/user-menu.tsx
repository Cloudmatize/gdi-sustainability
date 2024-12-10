import federatedLogout from "@/utils/auth/federated-logout";
import { LogOut, Settings, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";

interface UserMenuProps {
  dict: any
}

export function UserMenu({ dict }: UserMenuProps) {
  const { data } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="flex flex-row" tooltip={"Menu de usuário"}>
          <User2 />
          <p className=" w-full text-wrap">{data?.user?.name}</p>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel>{data?.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
        >
          <Link href="/settings" className="flex items-center gap-2 justify-between">
            <Settings size={20} />
            <span>{dict.settings}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => federatedLogout()}
          className="cursor-pointer"
        >
          <LogOut />
          <span>{dict.logout}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
