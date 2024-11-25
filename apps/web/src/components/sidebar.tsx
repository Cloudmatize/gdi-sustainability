"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ChevronLeft, Target } from "lucide-react";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  canSeeSidebarAfterMinimalize?: boolean;
}

export function Sidebar({
  children,
  isOpen,
  setIsOpen,
  canSeeSidebarAfterMinimalize = false,
}: Props) {
  const sidebarWidth = isOpen
    ? "w-96"
    : canSeeSidebarAfterMinimalize
      ? "w-36"
      : "w-0";
  const sidebarTransform = isOpen
    ? "translate-x-0"
    : canSeeSidebarAfterMinimalize
      ? "translate-x-[60%]"
      : "translate-x-full";

  const buttonPosition = isOpen ? "justify-end" : "justify-start";

  return (
    <>
      <div
        className={`fixed  border right-0 top-0 h-full ${sidebarWidth} bg-white shadow-lg z-50 transition-all duration-300 ${sidebarTransform}`}
      >
        <div className="h-full flex flex-col">
          <div className={`flex ${buttonPosition} items-center p-2`}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Target className="h-8 w-8" />
              )}
            </Button>
          </div>
          <div
            className={`flex-grow overflow-y-auto transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
