"use client";

import { Footer } from "@/components/footer";
import { Sidebar } from "@/components/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Navbar } from "./navbar";

export default function Dashboard({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;
  return (
    <>
      <Sidebar />
      <Navbar />
      <main
        className={cn(
          "min-h-[calc(100vh-112px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 pt-8 pb-8 px-4 sm:px-8",
          !settings.disabled && (!getOpenState() ? "lg:ml-22.5" : "lg:ml-72")
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          "sticky bottom-0 z-10 transition-[margin-left] ease-in-out duration-300",
          !settings.disabled && (!getOpenState() ? "lg:ml-22.5" : "lg:ml-72")
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
