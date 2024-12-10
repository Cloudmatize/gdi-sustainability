'use client'
import { DictionaryProvider } from "@/context/DictionaryContext";

interface Props {
    params: {
        lang: string;
    };
    children: React.ReactElement
}

export default function Page({ params: { lang }, children }: Props) {

    return (
        <DictionaryProvider locale={lang}>
            {children}
        </DictionaryProvider>
    );
}
