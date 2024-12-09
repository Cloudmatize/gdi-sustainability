'use client'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

interface ThemeSwitchProps {
    dict: any
}

function ThemeSwitch({ dict }: ThemeSwitchProps) {
    const { setTheme, theme } = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className='w-full'>
                    {theme === 'dark' ? (
                        <Moon className="h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0 dark:scale-100" />
                    ) : (
                        <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:-rotate-90 dark:scale-0" />
                    )}
                    <span>{dict.title}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    {dict.light}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    {dict.dark}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    {dict.system}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ThemeSwitch