"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, 
  // UserStar, 
  Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge";
import { UserRoundPen } from "lucide-react";
// import { useDialogStore } from "@/store/dialog-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  //DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "@/lib/types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserData = {
  id: string,
  name: string
}

export const columns = ({ onDelete, onUpdate }: { onUpdate: (data: User) => void, onDelete: (data: User) => void }): ColumnDef<User>[] => [
  {
    accessorKey: "sn",
    header: "#",
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
    {
    accessorKey: "department_name",
    header: "Department",
  },
    {
    accessorKey: "rank_name",
    header: "Rank",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "isVerified",
    header: "Status",
    cell: ({ row }) => {
      const isVerified = row.getValue("isVerified") as boolean;

      return (
        <Badge
          className={
            isVerified
              ? "bg-green-100 text-green-700 hover:bg-green-100"
              : "bg-red-100 text-red-700 hover:bg-red-100"
          }
        >
          {isVerified ? "Verified" : "Not Verified"}
        </Badge>
      );
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      // const router = useRouter();
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
              View Profile
            </DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={() => onUpdate(data)}><UserRoundPen />Edit Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(data)}><Trash2 color="#fd0c42" /> Delete Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
