"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "@/components/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";

interface MenuProps {
  isOpen: boolean | undefined;
  onNavigate?: () => void;
}

export function Menu({ isOpen, onNavigate }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList();
  const router = useRouter();
  const { clearAuth } = useAuthStore((s) => s);
  const handleLogout = () => {
    clearAuth()
    router.push("/");
  }

  return (
    // <ScrollArea className="[&>div>div[style]]:block! mt-3">
    <nav className="mt-3 flex h-full flex-col">
      <ul className="flex-1 overflow-y-auto px-2">
        {menuList.map(({ groupLabel, menus }, index) => (
          <li key={index} className={cn("w-full", groupLabel ? "pt-5" : "")}>
            {(isOpen && groupLabel) || isOpen === undefined ? (
              <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-62 truncate">
                {groupLabel}
              </p>
            ) : !isOpen && isOpen !== undefined && groupLabel ? (
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger className="w-full">
                    <div className="w-full flex justify-center items-center">
                      <Ellipsis className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{groupLabel}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <p className="pb-2"></p>
            )}
            {menus.map(
              ({ href, label, icon: Icon, active, submenus }, index) =>
                !submenus || submenus.length === 0 ? (
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={
                              (active === undefined &&
                                pathname.startsWith(href)) ||
                                active
                                ? "default"
                                : "ghost"
                            }
                            className="w-full justify-start h-10 mb-1 dark:text-white"
                            asChild
                          >
                            <Link href={href} onClick={onNavigate}>
                              <span
                                className={cn(isOpen === false ? "" : "mr-4")}
                              >
                                <Icon size={18} />
                              </span>
                              <p
                                className={cn(
                                  "max-w-50 truncate",
                                  isOpen === false
                                    ? "-translate-x-96 opacity-0"
                                    : "translate-x-0 opacity-100"
                                )}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isOpen === false && (
                          <TooltipContent side="right">
                            {label}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      icon={Icon}
                      label={label}
                      active={
                        active === undefined
                          ? pathname.startsWith(href)
                          : active
                      }
                      submenus={submenus}
                      isOpen={isOpen}
                      onNavigate={onNavigate}
                    />
                  </div>
                )
            )}
          </li>
        ))}
      </ul>
      <div className="p-2">
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full justify-center h-10"
              >
                <span className={cn(isOpen === false ? "" : "mr-4")}>
                  <LogOut size={18} />
                </span>
                <p
                  className={cn(
                    "whitespace-nowrap",
                    isOpen === false ? "opacity-0 hidden" : "opacity-100"
                  )}
                >
                  Sign out
                </p>
              </Button>
            </TooltipTrigger>
            {isOpen === false && (
              <TooltipContent side="right">Sign out</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

    </nav>
    // </ScrollArea>
  );
}
