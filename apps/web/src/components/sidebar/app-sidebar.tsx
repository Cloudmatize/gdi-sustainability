'use client'

import { useDictionary } from "@/context/DictionaryContext"
import { useSidebar } from "../ui/sidebar"
import { DesktopSideBar } from "./desktop-sidebar"
import { MobileSideBar } from "./mobile-sidebar"


export function AppSidebar() {
  const { dict, loadDictionary } = useDictionary();
  const { isMobile } = useSidebar()

  if (isMobile) {
    return <MobileSideBar dict={dict} />
  }
  return (<DesktopSideBar dict={dict} />)
}
