'use client'

import { useSidebar } from "../ui/sidebar"
import { DesktopSideBar } from "./desktop-sidebar"
import { MobileSideBar } from "./mobile-sidebar"


export function AppSidebar() {
  const { isMobile } = useSidebar()

  if (isMobile) {
    return <MobileSideBar />
  }
  return (<DesktopSideBar />)
}
