"use client";
import { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { columns } from "./column";
import { DeleteUser } from "./DeleteUser";
import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button";
import { FileDown, Printer, Search } from "lucide-react";
import { exportToExcel } from "@/lib/exportToExcel";
import { useDashboardStore } from "@/store/dashboard-store";
import { getUsersRequest } from "@/services/fetchdata";
import { User } from "@/lib/types";
import { UpdateUser } from "./UpdateUser";

interface UserData {
    sn: number,
    name: string,
    email: string,
    phone: string,
    role: string,
    id: string
}

    // sn: number;
    // id: string;
    // full_name: string;
    // department_name: string;
    // department_id: string;
    // rank_name: string;
    // rank_id: string;
    // phone?: string | undefined;
    // email: string;
    // image?: string | undefined;
    // role: string;
    // link?: string | undefined;
    // isVerified?: boolean | undefined
export type UserProps = {
    data: UserData[]
}

export function UserTable() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
     const [updateOpen, setUpdateOpen] = useState(false);
    const [selected, setSelected] = useState<User>({
        id: "", department_name: "", department_id: "", rank_name: "", full_name: "", role: "", email: "", rank_id: "", phone: "" 
    });
    const axiosPrivate = useAxiosPrivate()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [newdata, setNewData] = useState<Record<string, unknown>[]>([])
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    const { setUsers, users } = useDashboardStore((s) => s);

    const formatted = users.map((user, idx) => ({
        ...user,
        sn: idx + 1,
    }));

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getUsersRequest(axiosPrivate);
                setUsers(users);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, [setUsers, axiosPrivate]);

    const onDelete = (params: User) => {
        setSelected(params);
        setOpen(true);
    };
    const onUpdate = (params: User) => {
        setSelected(params);
        setUpdateOpen(true);
    };
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between m-5">
                <div className="relative w-64 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />

                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="grid grid-cols-2 sm:flex gap-2 mt-5 sm:mt-0">
                    <Button onClick={reactToPrintFn}>
                        <Printer />
                        Print
                    </Button>
                    <Button onClick={() => exportToExcel(formatted, "users")}>
                        <FileDown />
                        Export
                    </Button>
                </div>
            </div>
            <div ref={contentRef}>
                <DataTable columns={columns({ onDelete, onUpdate })} data={formatted} globalFilter={search} setGlobalFilter={setSearch} />
            </div>
            <DeleteUser open={open} setOpen={setOpen} selected={selected} />
            <UpdateUser open={updateOpen} setOpen={setUpdateOpen} selected={selected} />
        </>
    )
}
