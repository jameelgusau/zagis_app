"use client";
import { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { columns } from "./column";
import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button";
import { FileDown, Printer, Search } from "lucide-react";
import { exportToExcel } from "@/lib/exportToExcel";
import { getFilesRequest } from "@/services/fetchdata";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useDashboardStore } from "@/store/dashboard-store";
import { DeleteLga } from "./DeleteRecord";
import { UpdateRecord } from "./UpdateRecord";
import { FileRecord } from "@/lib/types";

export function RecordTable() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selected, setSelected] = useState<FileRecord>({
        id: "", file_id: "", cofo_number: "", title_holder_name: "", collected: "No",  purpose_id: "", landuse_id: "", certificate_type: "Temporary"
    });
    const axiosPrivate = useAxiosPrivate()
    const { setRecords, records } = useDashboardStore((s) => s);
    // const [lgas, setLgas] = useState<LGA[]>([])
    
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const newData = await getFilesRequest(axiosPrivate);
                setRecords(newData);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, [setRecords, axiosPrivate]);

    const formatted = records.map((user, idx) => ({
        ...user,
        sn: idx + 1,
    }));

    const onDelete = (params: FileRecord) => {
        setSelected(params);
        setOpen(true);
    };

    const onUpdate = (params: FileRecord) => {
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
                    <Button onClick={() => exportToExcel(formatted, "lgas")}>
                        <FileDown />
                        Export
                    </Button>
                </div>
            </div>
            <div ref={contentRef}>
                <DataTable columns={columns({ onDelete, onUpdate})} data={formatted} globalFilter={search} setGlobalFilter={setSearch} />
            </div>
            <DeleteLga open={open} setOpen={setOpen} selected={selected} />
            <UpdateRecord open={updateOpen} setOpen={setUpdateOpen} selected={selected}/>
        </>
    )
}
