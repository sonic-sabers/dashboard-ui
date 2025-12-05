import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { columns } from "@/components/orders-table/columns";
import { DataTableToolbar } from "@/components/orders-table/data-table-toolbar";
import { useRef } from "react";

const MotionTableBody = motion(TableBody);
const MotionTableRow = motion(TableRow);

const globalFilterFn = (row: any, columnId: string, filterValue: string) => {
  const search = filterValue.toLowerCase();
  const order = row.original;

  const searchableFields = [
    order.id?.toLowerCase() || "",
    order.user?.name?.toLowerCase() || "",
    order.project?.toLowerCase() || "",
    order.address?.toLowerCase() || "",
    order.status?.toLowerCase() || "",
  ];

  return searchableFields.some((field) => field.includes(search));
};

export function DataTable({
  data,
  copyStates = {},
  onCopyOrder,
  copiedAddresses = {},
  onCopyAddress,
}: {
  data: any[];
  copyStates?: Record<string, string>;
  onCopyOrder?: (id: string) => void;
  copiedAddresses?: Record<string, boolean>;
  onCopyAddress?: (address: string) => void;
}) {
  const hasAnimated = useRef(false);
  const currentPage = useRef(0);

  // Helper to check if filters are active
  const hasActiveFilters = (table: any) => {
    const globalFilter = table.getState().globalFilter;
    const columnFilters = table.getState().columnFilters;
    return !!globalFilter || columnFilters.length > 0;
  };

  // Reset all filters
  const resetFilters = (table: any) => {
    table.setGlobalFilter("");
    table.resetColumnFilters();
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    meta: {
      copyStates,
      onCopyOrder,
      copiedAddresses,
      onCopyAddress,
    },
  });

  return (
    <div className="space-y-3">
      <DataTableToolbar table={table} />
      <div className="rounded-lg bg-white dark:bg-gray-900 overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize(),
                        minWidth: header.column.columnDef.minSize,
                        maxWidth: header.column.columnDef.maxSize,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {!hasAnimated.current &&
          table.getState().pagination.pageIndex === 0 ? (
            <MotionTableBody
              initial="hidden"
              animate="visible"
              onAnimationComplete={() => {
                hasAnimated.current = true;
              }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.03, delayChildren: 0.02 },
                },
              }}
            >
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <MotionTableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    variants={{
                      hidden: { opacity: 0, y: 6 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.2, ease: "easeOut" },
                      },
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          minWidth: cell.column.columnDef.minSize,
                          maxWidth: cell.column.columnDef.maxSize,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </MotionTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-64 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      {hasActiveFilters(table) ? (
                        <>
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800">
                            <Search className="w-6 h-6 text-gray-400" />
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              No results found
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">
                              No orders match your current search or filter
                              criteria.
                            </p>
                          </div>
                          <button
                            onClick={() => resetFilters(table)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                            Clear filters
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800">
                            <Search className="w-6 h-6 text-gray-400" />
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              No orders yet
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Orders will appear here once they are created.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </MotionTableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          minWidth: cell.column.columnDef.minSize,
                          maxWidth: cell.column.columnDef.maxSize,
                        }}
                      >
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
                    className="h-64 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      {hasActiveFilters(table) ? (
                        <>
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800">
                            <Search className="w-6 h-6 text-gray-400" />
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              No results found
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">
                              No orders match your current search or filter
                              criteria.
                            </p>
                          </div>
                          <button
                            onClick={() => resetFilters(table)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                            Clear filters
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800">
                            <Search className="w-6 h-6 text-gray-400" />
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              No orders yet
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Orders will appear here once they are created.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="flex justify-end items-center justify-center py-4 border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </button>

          {Array.from(
            { length: Math.min(5, table.getPageCount()) },
            (_, i) => i + 1
          ).map((page) => {
            const isActive = table.getState().pagination.pageIndex + 1 === page;
            return (
              <button
                key={page}
                onClick={() => table.setPageIndex(page - 1)}
                className={`min-w-[32px] h-8 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-100 text-gray-700 dark:bg-white dark:text-gray-900"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
