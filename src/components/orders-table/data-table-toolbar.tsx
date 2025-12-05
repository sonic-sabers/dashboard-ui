import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  ArrowUpDown,
  ListFilter,
  Plus,
  Search,
  X,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useEffect, useState } from "react";

const statuses = ["In Progress", "Complete", "Pending", "Approved", "Rejected"];

export function DataTableToolbar({ table }: { table: any }) {
  const columnFilters = table.getState().columnFilters;
  const globalFilter = table.getState().globalFilter || "";
  const statusFilter =
    columnFilters.find((filter: any) => filter.id === "status")?.value || [];
  const [selectedStatuses, setSelectedStatuses] =
    useState<string[]>(statusFilter);
  const [sortOption, setSortOption] = useState<string>("none");

  useEffect(() => {
    const currentFilter =
      columnFilters.find((filter: any) => filter.id === "status")?.value || [];
    setSelectedStatuses(Array.isArray(currentFilter) ? currentFilter : []);
  }, [columnFilters]);

  const isFiltered = columnFilters.length > 0 || globalFilter.length > 0;
  const isSorted = sortOption !== "none";

  const handleStatusToggle = (status: string) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];

    setSelectedStatuses(newStatuses);

    if (newStatuses.length > 0) {
      table.getColumn("status").setFilterValue(newStatuses);
    } else {
      table.getColumn("status").setFilterValue(undefined);
    }
  };

  const handleSort = (option: string) => {
    setSortOption(option);

    // Clear all sorting first
    table.resetSorting();

    switch (option) {
      case "date-desc":
        table.getColumn("date")?.toggleSorting(true); // descending
        break;
      case "date-asc":
        table.getColumn("date")?.toggleSorting(false); // ascending
        break;
      case "user-asc":
        table.getColumn("user")?.toggleSorting(false);
        break;
      case "user-desc":
        table.getColumn("user")?.toggleSorting(true);
        break;
      case "status-asc":
        table.getColumn("status")?.toggleSorting(false);
        break;
      case "status-desc":
        table.getColumn("status")?.toggleSorting(true);
        break;
      case "none":
      default:
        // No sorting
        break;
    }
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSortOption("none");
    table.resetColumnFilters();
    table.setGlobalFilter("");
    table.resetSorting();
  };

  return (
    <div className="flex items-center bg-[#F7F9FB] p-1 dark:bg-gray-700/50 rounded-lg dark:border-gray-700 justify-between gap-4">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 relative ${
                selectedStatuses.length > 0
                  ? "text-blue-600 dark:text-blue-400"
                  : ""
              }`}
            >
              <ListFilter className="h-4 w-4" />
              {selectedStatuses.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 dark:bg-blue-500 text-[10px] font-semibold text-white flex items-center justify-center">
                  {selectedStatuses.length}
                </span>
              )}
              <span className="sr-only">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => handleStatusToggle(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${
                isSorted ? "text-blue-600 dark:text-blue-400" : ""
              }`}
            >
              <ArrowUpDown className="h-4 w-4" />
              <span className="sr-only">Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={sortOption}
              onValueChange={handleSort}
            >
              <DropdownMenuRadioItem value="none">None</DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioItem value="date-desc">
                <div className="flex items-center gap-2">
                  <ArrowDown className="h-3.5 w-3.5" />
                  Date (Newest first)
                </div>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="date-asc">
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-3.5 w-3.5" />
                  Date (Oldest first)
                </div>
              </DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioItem value="user-asc">
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-3.5 w-3.5" />
                  User (A-Z)
                </div>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="user-desc">
                <div className="flex items-center gap-2">
                  <ArrowDown className="h-3.5 w-3.5" />
                  User (Z-A)
                </div>
              </DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioItem value="status-asc">
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-3.5 w-3.5" />
                  Status (A-Z)
                </div>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="status-desc">
                <div className="flex items-center gap-2">
                  <ArrowDown className="h-3.5 w-3.5" />
                  Status (Z-A)
                </div>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters Button - Only show when filters or sorting are active */}
        {(isFiltered || isSorted) && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="h-8 px-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="relative pr-1 w-[160px]">
        <Search className="absolute left-2 top-1/2 h-[13px] w-[13px] -translate-y-1/2 text-[#1C1C1C]/20 dark:text-gray-400" />
        <Input
          placeholder="Search"
          value={globalFilter}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="h-7 pl-7 pr-7 py-1 text-sm font-normal bg-white/40 dark:bg-gray-800/40 border border-[#1C1C1C]/10 dark:border-gray-700 rounded-lg placeholder:text-[#1C1C1C]/40 dark:placeholder:text-gray-500"
        />
        {globalFilter && (
          <button
            onClick={() => table.setGlobalFilter("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
