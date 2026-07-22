"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/user-nav";
import { SheetMenu } from "@/components/sheet-menu";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
// import { SelectComponent } from "./select";

// interface NavbarProps {
//   title: string;
// }

export function Navbar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;
  return (
    <header className={cn("sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 dark:shadow-secondary", !settings.disabled && (!getOpenState() ? "lg:ml-22.5" : "lg:ml-72"))}>
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          {/* <SelectComponent /> */}
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
