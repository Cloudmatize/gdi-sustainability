'use client'
import LoadingPage from '@/components/loading-page';
import { getServerSidePropsHelper } from '@/helpers/dictionaryHelper';
import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export interface DictionaryContextType {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    dict: any | null;
    loadDictionary?: (locale: string) => Promise<void>;
}

const DictionaryContext = createContext<DictionaryContextType | undefined>(undefined);

export const useDictionary = () => {
    const context = useContext(DictionaryContext);
    if (!context) {
        throw new Error('useDictionary must be used within a DictionaryProvider');
    }
    return context;
};

export const DictionaryProvider = ({ children, locale }: { children: React.ReactNode; locale: string }) => {
    const [dict, setDict] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadDictionary = async (locale: string) => {
        try {
            const dictionary = await getServerSidePropsHelper({ locale });
            console.log('Updated dictionary:', dictionary.dictionaryData);
            setDict(dictionary.dictionaryData);
        } catch (error) {
            console.error('Failed to load dictionary:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        loadDictionary(locale);
    }, [locale]);

    return (
        <DictionaryContext.Provider value={{ dict, loadDictionary }}>
            {isLoading ? (
                <LoadingPage />
            ) : (
                children
            )}
        </DictionaryContext.Provider>
    );
};
