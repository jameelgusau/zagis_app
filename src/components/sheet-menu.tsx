"use client"
import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetMenu() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet  open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 py-3 h-full flex flex-col border-0" side="left">
        <SheetHeader className="mt-3">
          <Button
            className="flex justify-center items-center pb-2 pt-1 flex-col"
            variant="link"
            asChild
          >
            <Link href="/home" className="flex items-center gap-2">
              <Image
                className="dark:invert"
                src="/logo.png"
                alt="Next.js logo"
                width={200}
                height={120}
                priority
              />
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
