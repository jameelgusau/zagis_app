"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  //DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileRecord } from "@/lib/types"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns = ({ onDelete, onUpdate }: { onUpdate: ({ id, cofo_number }: FileRecord) => void, onDelete: ({ id, cofo_number }: FileRecord) => void }): ColumnDef<FileRecord>[] => [
  {
    accessorKey: "sn",
    header: "#",
  },
  {
    accessorKey: "cofo_number",
    header: "File Number",
  },
  {
    accessorKey: "title_holder_name",
    header: "Title Name",
  },
  {
    accessorKey: "page_number",
    header: "Page Number",
  },
  {
    accessorKey: "serial_number",
    header: "Serial Number",
  },
   {
    accessorKey: "volume_number",
    header: "Volume Number",
  },
  {
    accessorKey: "registration_date",
    header: "Registration Date",
  },
  {
    accessorKey: "execution_date",
    header: "Execution Date",
  },
  {
    accessorKey: "collection_date",
    header: "Collection Date",
  },
  {
    accessorKey: "certificate_type",
    header: "Type",
  },
  {
    accessorKey: "collected",
    header: "Status",
    cell: ({ row }) => {
      const collected = row.getValue("collected");

      return (
        <Badge
          className={
            collected === "Yes"
              ? "bg-green-100 text-green-700 hover:bg-green-100"
              : "bg-red-100 text-red-700 hover:bg-red-100"
          }
        >
          {collected === "Yes" ? "Collected" : "Not Collected"}
        </Badge>
      );
    },
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
            <DropdownMenuItem onClick={() => onUpdate(data)}> <Pencil /> Edit File</DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => onDelete(data)}><Trash2 color="#fd0c42" /> Delete File</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]