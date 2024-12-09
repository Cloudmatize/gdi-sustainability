'use client'
import { Languages } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface LangProps {
    dict: any
    title?: boolean
}

// biome-ignore lint/suspicious/noExplicitAny: x
function LangSwitch({ dict, title }: LangProps) {
    const changeLang = (locale: string) => {
        document.cookie = `preferredLocale=${locale}; path=/; max-age=31536000`;
        window.location.reload(); // Recarregar para aplicar a nova configuração de idioma
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                {title ? (<Button variant="outline" className="w-full bg-primary"><Languages />{dict.title}</Button>) : <Languages />}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
                <DropdownMenuLabel>{dict.title}</DropdownMenuLabel>
                <DropdownMenuItem
                    className="cursor-pointer w-full h-12"

                    onClick={() => changeLang('pt')}
                >
                    <Image src="/langs/pt.png" alt={dict.pt} height={20} width={20} />
                    <span>{dict.pt}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer w-full h-12"

                    onClick={() => changeLang('en')}
                >
                    <Image src="/langs/en.png" alt={dict.en} height={20} width={20} />
                    <span>{dict.en}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LangSwitch