import LangSwitch from "@/components/lang-switch"
import { getColors } from "@/components/theme-provider/theme-cookie"
import { Separator } from "@/components/ui/separator"
import { Settings } from "lucide-react"
import { getDictionary } from "../../dictionaries"

async function Page({ params: { lang } }: {
    params: { lang: string }
}) {
    const colorTypes = ['primary', 'foreground']
    let colors = await getColors(colorTypes)
    if (!colors) {
        colors = [
            { type: 'primary', color: '#00E682' },
            { type: 'foreground', color: '#fafafa' },
        ]
    }
    const dict = await getDictionary(lang)

    return (
        <div className="min-h-screen bg-background p-4 md:p-6 lg:px-16">
            <div className="mx-auto space-y-6">
                {/* Header */}

                <div className="flex items-center justify-between flex-wrap">
                    <div className="flex items-center gap-4">
                        <h1 className="flex flex-nowrap break-keep items-center gap-3 text-3xl font-bold text-foreground">
                            {dict.settings.title} <Settings size={36} />
                        </h1>
                    </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground max-w-lg">
                    {dict.settings.description}
                    Alterações realizadas aqui ficarão salvas apenas neste dispositivo
                </p>

                <div className="flex flex-col max-w-fit gap-4">
                    <LangSwitch dict={dict.dashboard.langSwitch} title={true} />
                    {/* <ThemeSwitch dict={dict.themeSwitch} /> */}

                </div>
                <div className="flex flex-col w-full gap-4">
                    <Separator />
                    {/* <div className="flex flex-col max-w-fit gap-4">
                        <ThemeColor dict={dict.themeColorSwitch} colors={colors} />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Page