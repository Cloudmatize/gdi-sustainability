import {
  LifeBuoy,
  Link,
  LogOut,
  Mail,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
          <Image
            src="/jorjinho.png"
            width={16}
            height={16}
            alt="Imagem de perfil"
            className="rounded-full"
          />
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
