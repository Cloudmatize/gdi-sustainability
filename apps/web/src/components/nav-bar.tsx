"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import federatedLogout from "@/utils/auth/federated-logout";
import {
  Building2,
  Goal,
  LayoutDashboard,
  Leaf,
  LogOut,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Visão geral",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Emissão de transportes",
    href: "/transports",
    icon: <Truck className="h-4 w-4" />,
  },
  {
    title: "Emissão de edifícios",
    href: "/buildings",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    title: "Metas",
    href: "/targets",
    icon: <Goal className="h-4 w-4" />,
  },
];

export default function NavBar() {
  return (
    <div className="flex w-full">
      <Card className="rounded-none border-b shadow-none w-full">
        <div className=" flex h-16 items-center gap-4 px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <Leaf className="h-5 w-5 text-primary-foreground" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
          <nav className="flex justify-center  flex-1 items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary-foreground ${item.title === "Building Emission"
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                  }`}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => federatedLogout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
    </div>
  );
}
