
"use client";

import { useCallback, useEffect, useState } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

// import {axiosPrivate} from "@/lib/axios";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { RateFormDialog, GroundRentRatePayload, ZoneOption, PurposeOption } from "./rate-form";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
    MoreHorizontal,
    Pencil,
    Trash2,
    Plus,
    Search,
} from "lucide-react";
import { APIS } from "@/lib/config"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";

type GroundRentRate = {
    id: string;
    zone: string;
    purpose: string;
    rate_per_sqm: number;
    effective_from: string;
    effective_to: string | null;
};

export function RateTable() {
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const [rates, setRates] = useState<GroundRentRate[]>([]);
    const [zones, setZones] = useState<ZoneOption[]>([]);
    const [purposes, setPurposes] = useState<PurposeOption[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { getGroundRentRates, getZones, getPurpose } = APIS;
    // Fetch rates, zones and purposes
    const axiosPrivate = useAxiosPrivate();
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const [rateRes, zoneRes, purposeRes] = await Promise.all([
                axiosPrivate.get(getGroundRentRates.path),
                axiosPrivate.get(getZones.path),
                axiosPrivate.get(getPurpose.path),
            ]);

            const rateData = rateRes.data.data ?? [];
            const zoneData = zoneRes.data.data ?? [];
            const purposeData = purposeRes.data.data ?? [];

            setZones(zoneData);
            setPurposes(purposeData);
            console.log("Fetched ground rent rates:", rateData);
            setRates(
                rateData.map((item: any) => ({
                    id: item.id,
                    lga:
                        item.lga?.name ??
                        item.lga_name ??
                        item.lga ??
                        "N/A",
                    zone:
                        item.zone?.name ??
                        item.zone_name ??
                        item.zone ??
                        "N/A",
                    purpose:
                        item.purpose?.name ??
                        item.purpose_name ??
                        item.purpose ??
                        "N/A",
                    rate_per_sqm: Number(item.rate_per_sqm),
                    effective_from: item.effective_from,
                    effective_to: item.effective_to,
                }))
            );
        } catch (err) {
            console.error("Failed to fetch ground rent data:", err);
            setError("Unable to load ground rent rates. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Create new rate
    const handleCreateRate = async (values: GroundRentRatePayload) => {
        await axiosPrivate.post("/ground-rent-rate", values);

        await fetchData();
    };

    const columns: ColumnDef<GroundRentRate>[] = [
        {
            accessorKey: "zone",
            header: "Zone",
        },
        {
            accessorKey: "lga",
            header: "LGA",
        },
        {
            accessorKey: "purpose",
            header: "Purpose",
        },
        {
            accessorKey: "rate_per_sqm",
            header: "Rate per sqm",
            cell: ({ row }) =>
                `₦${Number(row.original.rate_per_sqm).toLocaleString("en-NG")}`,
        },
        {
            accessorKey: "effective_from",
            header: "Effective From",
        },
        {
            accessorKey: "effective_to",
            header: "Effective To",
            cell: ({ row }) => row.original.effective_to ?? "Ongoing",
        },
        {
            id: "status",
            header: "Status",
            cell: ({ row }) => {
                const today = new Date().toISOString().split("T")[0];

                const effectiveFrom = row.original.effective_from;
                const effectiveTo = row.original.effective_to;

                const isActive =
                    effectiveFrom <= today &&
                    (!effectiveTo || effectiveTo >= today);

                return (
                    <Badge variant={isActive ? "default" : "secondary"}>
                        {isActive ? "Active" : "Historical"}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            header: "",
            cell: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const table = useReactTable({
        data: rates,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold">
                        Ground Rent Rates
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage rates by zone and property purpose.
                    </p>
                </div>

                <Button
                    onClick={() => setOpenAddDialog(true)}
                    disabled={loading}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Rate
                </Button>
            </div>

            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search rates..."
                    className="pl-9"
                />
            </div>

            {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                    <Button
                        variant="link"
                        size="sm"
                        onClick={fetchData}
                    >
                        Retry
                    </Button>
                </div>
            )}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Loading rates...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No rates found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <RateFormDialog
                open={openAddDialog}
                onOpenChange={setOpenAddDialog}
                zones={zones}
                purposes={purposes}
                onSubmit={handleCreateRate}
            />
        </div>
    );
}
