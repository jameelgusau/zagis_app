"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Department } from "@/lib/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns = ({ onDelete, onUpdate }: { onUpdate: ({ id,  department_name }: Department) => void, onDelete: ({ id,  department_name }: Department) => void }): ColumnDef<Department>[] => [
  {
    accessorKey: "sn",
    header: "#",
  },
  {
    accessorKey: "department_name",
    header: "Name",
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
          <DropdownMenuContent align="end" className="w-fit">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => router.push(`/users/${data.id}`)}
            >
              <UserStar />
              View Departments
            </DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={() => onUpdate(data)}><Pencil />Edit Department</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(data)}><Trash2 color="#fd0c42" /> Delete Department</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
