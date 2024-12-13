'use client'
import { useDictionary } from "@/context/DictionaryContext";
import NotFound from "../../not-found";

export default function NotFoundCatchAll() {
    const { dict } = useDictionary()
    return (<NotFound dict={dict} />)
}