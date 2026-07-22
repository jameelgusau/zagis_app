"use client";
import { Menu } from "@/components/menu";
import Image from "next/image";
import { SidebarToggle } from "@/components/sidebar-toggle";
// import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
// import { PanelsTopLeft } from "lucide-react";
// import Link from "next/link";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 h-screen left-0 z-20 -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-22.5" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative flex h-full flex-col px-3"
      >
        <div className={cn(
          "flex flex-col items-center gap-2 transition-transform ease-in-out duration-300",
          !getOpenState() ? "translate-x-1" : "translate-x-0"
        )}>
          <Image
            className="dark:invert"
            src="/logo.png"
            alt="Next.js logo"
            width={120}
            height={120}
            priority
          />
          <h1
            className={cn(
              "font-bold  transition-[transform,opacity,display] ease-in-out duration-300",
              !getOpenState()
                ? "-translate-x-96 opacity-0 hidden"
                : "translate-x-0 opacity-100"
            )}
          >
            Land
            Information System
          </h1>
        </div>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
