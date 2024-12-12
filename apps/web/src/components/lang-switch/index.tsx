'use client'
import { useDictionary } from "@/context/DictionaryContext";
import { Languages } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface LangProps {
    title?: boolean
}

function LangSwitch({ title }: LangProps) {
    const { dict } = useDictionary();
    const changeLang = (locale: string) => {
        document.cookie = `preferredLocale=${locale}; path=/; max-age=31536000`;
        window.location.reload(); // Recarregar para aplicar a nova configuração de idioma
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                {title ? (<Button variant="outline" className="w-full"><Languages />{dict?.dashboard.langSwitch?.title}</Button>) : <Languages />}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="gap-1">
                <DropdownMenuLabel>{dict?.dashboard.langSwitch?.title}</DropdownMenuLabel>
                <DropdownMenuItem
                    className="cursor-pointer w-full"

                    onClick={() => changeLang('pt')}
                >
                    {/* <Image src="/langs/pt.png" alt={dict?.dashboard.langSwitch?.pt} height={20} width={20} /> */}
                    🇧🇷
                    <span>{dict?.dashboard.langSwitch?.pt}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer w-full"

                    onClick={() => changeLang('en')}
                >
                    🇺🇸
                    {/* <Image src="/langs/en.png" alt={dict?.dashboard.langSwitch?.en} height={20} width={20} /> */}
                    <span>{dict?.dashboard.langSwitch?.en}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer w-full"

                    onClick={() => changeLang('es')}
                >
                    🇪🇸
                    {/* <Image src="/langs/es.png" alt={dict?.dashboard.langSwitch?.es} height={20} width={20} /> */}
                    <span>{dict?.dashboard.langSwitch?.es}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LangSwitch