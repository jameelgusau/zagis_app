"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
// import { useDialogStore } from "@/store/dialog-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  //DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PurposeType } from "@/lib/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserData = {
  id: string,
  name: string
}

export const columns = ({ onDelete, onUpdate }: { onUpdate: (data: PurposeType) => void, onDelete: (data: PurposeType) => void }): ColumnDef<PurposeType>[] => [
  {
    accessorKey: "sn",
    header: "#",
  },

  {
    accessorKey: "purpose_name",
    header: "Purpose",
  },
  {
    accessorKey: "landuse_name",
    header: "Land Use",
  },
  {
    accessorKey: "lease_years",
    header: "Lease Years",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const data = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={() => onUpdate(data)}><Pencil />Edit Purpose</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(data)}><Trash2 color="#fd0c42" /> Delete Purpose</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
