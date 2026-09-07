"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react";

import { UserCount } from "@/lib/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<UserCount>[] = [
  {
    accessorKey: "sn",
    header: "#",
  },
  {
    accessorKey: "full_name",
    header: "Name",
  },{
    accessorKey: "totalFiles",
    header: "Files Count"
  }

]
