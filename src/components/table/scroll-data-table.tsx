"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./DataTablePagination"
// import { DataTablePagination } from "./DataTablePagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  globalFilter: string
  // setGlobalFilter: 
  setGlobalFilter: (filter: string) => void
}

export function ScrollDataTable<TData, TValue>({
  columns,
  data,
  globalFilter,
  setGlobalFilter
}: DataTableProps<TData, TValue>) {

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div>
      <div className="overflow-hidden mx-3 sm:mx-5">
        <Table className="mb-5">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  let classes = "";

                  if (header.column.id === "sn") classes = "md:sticky md:left-0 bg-white z-30";
                  else if (header.column.id === "name") classes = "md:sticky md:left-16 bg-white z-30";

                  // RIGHT SIDE (updated)
                  else if (header.column.id === "present_count") classes = "md:sticky md:right-32 bg-white z-30";
                  else if (header.column.id === "absent_count") classes = "md:sticky md:right-20 bg-white z-30";
                  else if (header.column.id === "percentage") classes = "md:sticky md:right-0 bg-white z-30";

                  return (
                    <TableHead key={header.id} className={classes}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    let classes = "";
                    if (cell.column.id === "sn") classes = "md:sticky md:left-0 bg-white z-20";
                    else if (cell.column.id === "name") classes = "md:sticky md:left-16 bg-white z-20";

                    // RIGHT SIDE (updated)
                    else if (cell.column.id === "present_count") classes = "md:sticky md:right-32 bg-white z-20";
                    else if (cell.column.id === "absent_count") classes = "md:sticky md:right-20 bg-white z-20";
                    else if (cell.column.id === "percentage") classes = "md:sticky md:right-0 bg-white z-20";

                    return (
                      <TableCell key={cell.id} className={classes}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="py-4 px-3 sm:px-5">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}