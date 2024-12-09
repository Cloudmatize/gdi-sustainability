'use client'

import { useSidebar } from "../ui/sidebar"
import { DesktopSideBar } from "./desktop-sidebar"
import { MobileSideBar } from "./mobile-sidebar"

interface AppSideBarProps {
  dict: any
}

export function AppSidebar({ dict }: AppSideBarProps) {
  const { isMobile } = useSidebar()

  if (isMobile) {
    return <MobileSideBar dict={dict} />
  }
  return (<DesktopSideBar dict={dict} />)
}
