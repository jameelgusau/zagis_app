"use client";
import { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { columns } from "./column";
import { DeleteZone } from "./DeleteZones";
import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button";
import { FileDown, Printer, Search } from "lucide-react";
import { exportToExcel } from "@/lib/exportToExcel";
import { useDashboardStore } from "@/store/dashboard-store";
import { getZonesRequest } from "../../../../services/fetchdata";
import { UpdateZone } from "./UpdateZones";
import { Zone } from "@/lib/types";


export function ZonesTable() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selected, setSelected] = useState<Zone>({
        id: "", name: "", description: "",
    });
    const axiosPrivate = useAxiosPrivate()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [newdata, setNewData] = useState<Record<string, unknown>[]>([])
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    const { setZones, zones: zones } = useDashboardStore((s) => s);

    const formatted = zones.map((zone, idx) => ({
        ...zone,
        sn: idx + 1,
    }));

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getZonesRequest(axiosPrivate);
                setZones(users);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, [setZones, axiosPrivate]);

    const onDelete = (params: Zone) => {
        setSelected(params);
        setOpen(true);
    };
    const onUpdate = (params: Zone) => {
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
            <DeleteZone open={open} setOpen={setOpen} selected={selected} />
            <UpdateZone open={updateOpen} setOpen={setUpdateOpen} selected={selected} />
        </>
    )
}
