import * as React from "react";
import { Calendar, Check, Clipboard, MoreHorizontal } from "lucide-react";
import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, BadgeDot } from "@/components/ui/badge";

const parseDate = (dateStr: string): number => {
  if (!dateStr) return 0;

  const now = Date.now();
  if (dateStr === "Just now") return now;
  if (dateStr === "A minute ago") return now - 60000;
  if (dateStr.includes("hour ago")) {
    const hours = parseInt(dateStr.match(/\d+/)?.[0] || "0");
    return now - hours * 3600000;
  }
  if (dateStr === "Today") return now;
  if (dateStr === "Yesterday") return now - 86400000;

  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) return parsed;

  return 0;
};

// Constant map to avoid recreation on every render
const STATUS_COLOR_MAP: Record<
  string,
  "blue" | "green" | "yellow" | "purple" | "red" | "gray"
> = {
  "In Progress": "blue",
  Complete: "green",
  Pending: "yellow",
  Approved: "yellow",
  Rejected: "gray",
} as const;

const getStatusColor = (
  status: string
): "blue" | "green" | "yellow" | "purple" | "red" | "gray" => {
  return STATUS_COLOR_MAP[status] || "gray";
};

export const columns = [
  {
    id: "select",
    header: ({ table }: any) => (
      <div className="flex items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
          className="data-[state=checked]:opacity-100 data-[state=indeterminate]:opacity-100"
        />
      </div>
    ),
    cell: ({ row }: any) => (
      <div className="flex items-center group-hover/row:opacity-100 transition-opacity">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className={
            row.getIsSelected()
              ? "opacity-100"
              : "opacity-0 group-hover/row:opacity-100"
          }
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
    minSize: 40,
    maxSize: 40,
  },
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }: any) => {
      return (
        <div className="text-xs font-normal text-gray-900 dark:text-white whitespace-nowrap">
          {row.getValue("id")}
        </div>
      );
    },
    size: 100,
    minSize: 100,
    maxSize: 120,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }: any) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={user.avatar}
              alt={user.name}
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-xs font-normal text-gray-900 dark:text-white truncate">
            {user.name}
          </span>
        </div>
      );
    },
    size: 180,
    minSize: 150,
    maxSize: 200,
    sortingFn: (rowA: any, rowB: any) => {
      const nameA = rowA.original.user.name.toLowerCase();
      const nameB = rowB.original.user.name.toLowerCase();
      return nameA.localeCompare(nameB);
    },
  },
  {
    accessorKey: "project",
    header: "Project",
    cell: ({ row }: any) => {
      return (
        <div className="text-xs font-normal text-gray-900 dark:text-white truncate">
          {row.getValue("project")}
        </div>
      );
    },
    size: 180,
    minSize: 150,
    maxSize: 220,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row, table }: any) => {
      const address = row.getValue("address");
      const copiedAddresses = table.options.meta?.copiedAddresses || {};
      const onCopyAddress = table.options.meta?.onCopyAddress;
      const copied = copiedAddresses[address] || false;

      const handleCopy = () => {
        if (onCopyAddress) {
          onCopyAddress(address);
        }
      };

      return (
        <div className="group/address flex items-center gap-2 text-xs font-normal text-gray-600 dark:text-gray-400">
          <span className="truncate">{address}</span>
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover/address:opacity-100 transition-opacity flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title="Copy address"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <Clipboard className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      );
    },
    size: 200,
    minSize: 180,
    maxSize: 250,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center gap-2 text-xs font-normal text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <span className="whitespace-nowrap">{row.getValue("date")}</span>
        </div>
      );
    },
    size: 140,
    minSize: 120,
    maxSize: 160,
    sortingFn: (rowA: any, rowB: any) => {
      const dateA = parseDate(rowA.original.date);
      const dateB = parseDate(rowB.original.date);
      return dateA - dateB;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.getValue("status");
      const color = getStatusColor(status);
      return (
        <Badge color={color}>
          <BadgeDot color={color} />
          {status}
        </Badge>
      );
    },
    size: 130,
    minSize: 120,
    maxSize: 150,
    filterFn: (row: any, id: string, value: string[]) => {
      if (!value || value.length === 0) return true;
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    enableHiding: false,
    size: 60,
    minSize: 60,
    maxSize: 80,
    cell: ({ row }: any) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all focus-visible:outline-none opacity-0 group-hover/row:opacity-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
