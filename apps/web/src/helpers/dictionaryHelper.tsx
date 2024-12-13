'use server'
import { getDictionary } from "@/app/[lang]/dictionaries";

export const getServerSidePropsHelper = async (context: { locale: string; }) => {
    const { locale } = context;

    try {
        const dictionaryData = await getDictionary(locale);

        return {
            dictionaryData
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true,
        };
    }
};
