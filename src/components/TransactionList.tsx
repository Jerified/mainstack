"use client";

import { useGetTransactionsQuery } from "@/lib/store/mainstackApi";
import {
  Download,
  MoveDownLeft,
  MoveUpRight,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { twMerge } from "tailwind-merge";
import { Separator } from "./ui/separator";
import { useState, useMemo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isWithinInterval } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "./ui/checkbox";

export default function TransactionList() {
  const textPrimary = twMerge("text-gray-400 text-sm");
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 700px)");

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(2022, 1, 1),
      endDate: new Date(2022, 3, 30),
      key: "selection",
    },
  ]);

  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<
    string[]
  >([]);
  const transactionTypes = [
    "Store Transactions",
    "Get Tipped",
    "Withdrawals",
    "Chargebacks",
    "Cashbacks",
    "Refer & earn",
  ];

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const transactionStatus = ["Successful", "Pending", "Failed"];

  const [activeDateFilter, setActiveDateFilter] = useState<string | null>(null);

  const { data: transactions, isLoading, isError } = useGetTransactionsQuery();

  // Apply filters to transactions
  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];

    return transactions.filter((tx) => {
      const txDate = new Date(tx.date);

      // Date range filter
      const isInDateRange = isWithinInterval(txDate, {
        start: dateRange[0].startDate,
        end: dateRange[0].endDate,
      });
      if (!isInDateRange) return false;

      // Transaction type filter
      if (selectedTransactionTypes.length > 0) {
        if (
          selectedTransactionTypes.includes("Withdrawals") &&
          tx.type === "withdrawal"
        ) {
          // Pass the filter
        } else if (
          selectedTransactionTypes.includes("Store Transactions") &&
          tx.type === "deposit"
        ) {
          // Pass the filter
        } else {
          return false;
        }
      }

      // Status filter
      if (selectedStatuses.length > 0) {
        const txStatus = tx.status.charAt(0).toUpperCase() + tx.status.slice(1);
        if (!selectedStatuses.includes(txStatus)) {
          return false;
        }
      }

      return true;
    });
  }, [transactions, dateRange, selectedTransactionTypes, selectedStatuses]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedTransactionTypes.length > 0) count++;
    if (selectedStatuses.length > 0) count++;
    if (
      activeDateFilter ||
      dateRange[0].startDate.toDateString() !==
        new Date(2022, 1, 1).toDateString() ||
      dateRange[0].endDate.toDateString() !==
        new Date(2022, 3, 30).toDateString()
    )
      count++;
    return count;
  }, [selectedTransactionTypes, selectedStatuses, dateRange, activeDateFilter]);

  const handleDateFilterClick = (filter: string) => {
    setActiveDateFilter(filter);
    const today = new Date();

    if (filter === "Last 7 days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      setDateRange([
        {
          startDate: sevenDaysAgo,
          endDate: today,
          key: "selection",
        },
      ]);
    } else if (filter === "Last 30 days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      setDateRange([
        {
          startDate: thirtyDaysAgo,
          endDate: today,
          key: "selection",
        },
      ]);
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="w-full">
        <div className="flex gap-3 mt-3 w-full overflow-x-auto no-scrollbar">
          <Button
            variant={activeDateFilter === "Last 7 days" ? "default" : "outline"}
            size="sm"
            className="!rounded-[100px] border px-4.5 py-2.5 whitespace-nowrap flex-shrink-0"
            onClick={() => handleDateFilterClick("Last 7 days")}
          >
            Last 7 days
          </Button>
          <Button
            variant={
              activeDateFilter === "Last 30 days" ? "default" : "outline"
            }
            size="sm"
            className="!rounded-[100px] border px-4.5 py-2.5 whitespace-nowrap flex-shrink-0"
            onClick={() => handleDateFilterClick("Last 30 days")}
          >
            Last 30 days
          </Button>
          <Button
            variant={activeDateFilter === "Custom" ? "default" : "outline"}
            size="sm"
            className="!rounded-[100px] border px-4.5 py-2.5 whitespace-nowrap flex-shrink-0"
            onClick={() => setActiveDateFilter("Custom")}
          >
            Custom
          </Button>
        </div>
        <h4 className="text-sm font-medium mb-2 mt-4">Date Range</h4>
        <div className="flex gap-3 max-w-full">
          <div className="flex items-center gap-2 w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between text-left font-normal"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(dateRange[0].startDate, "PPP")}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={dateRange[0].startDate}
                  onSelect={(date) => {
                    if (date) {
                      setDateRange([
                        {
                          ...dateRange[0],
                          startDate: date,
                        },
                      ]);
                      setActiveDateFilter("Custom");
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between text-left font-normal"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(dateRange[0].endDate, "PPP")}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={dateRange[0].endDate}
                  onSelect={(date) => {
                    if (date) {
                      setDateRange([
                        {
                          ...dateRange[0],
                          endDate: date,
                        },
                      ]);
                      setActiveDateFilter("Custom");
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="w-full">
        <h4 className="text-sm font-medium mb-2">Transaction Type</h4>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-left font-normal group"
            >
              <span className="flex-1 truncate pr-2 text-ellipsis">
                {selectedTransactionTypes.length > 0 ? (
                  <span className="inline-flex items-baseline">
                    {selectedTransactionTypes
                      .slice(0, -1)
                      .map((type, index) => (
                        <span key={index} className="whitespace-nowrap">
                          {type}
                          {index < selectedTransactionTypes.length - 2
                            ? ", "
                            : ""}
                        </span>
                      ))}
                    {selectedTransactionTypes.length > 1 && (
                      <span className="whitespace-nowrap">
                        {selectedTransactionTypes.length > 1 ? ", " : ""}
                        {selectedTransactionTypes.slice(-1)[0].length > 15
                          ? `${selectedTransactionTypes
                              .slice(-1)[0]
                              .substring(0, 12)}...`
                          : selectedTransactionTypes.slice(-1)[0]}
                      </span>
                    )}
                    {selectedTransactionTypes.length === 1 && (
                      <span>
                        {selectedTransactionTypes[0].length > 15
                          ? `${selectedTransactionTypes[0].substring(0, 12)}...`
                          : selectedTransactionTypes[0]}
                      </span>
                    )}
                  </span>
                ) : (
                  "Select transaction types"
                )}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-4"
            align="start"
            sideOffset={4}
          >
            <div className="space-y-2">
              {transactionTypes.map((type) => (
                <div
                  key={type}
                  className="flex items-center gap-2.5 space-x-2 p-2.5"
                >
                  <Checkbox
                    id={`type-${type}`}
                    checked={selectedTransactionTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      setSelectedTransactionTypes((prev) =>
                        checked
                          ? [...prev, type]
                          : prev.filter((t) => t !== type)
                      );
                    }}
                  />
                  <label
                    htmlFor={`type-${type}`}
                    className=" font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Transaction Status</h4>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-left font-normal"
            >
              <span className="truncate pr-2">
                {selectedStatuses.length > 0
                  ? selectedStatuses.map((status, index) => (
                      <span key={status}>
                        {status}
                        {index < selectedStatuses.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : "Select statuses"}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-4"
            align="start"
          >
            <div className="space-y-2">
              {transactionStatus.map((status) => (
                <div
                  key={status}
                  className="flex items-center gap-2.5 space-x-2 p-2.5"
                >
                  <Checkbox
                    id={`status-${status}`}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={(checked) => {
                      setSelectedStatuses((prev) =>
                        checked
                          ? [...prev, status]
                          : prev.filter((s) => s !== status)
                      );
                    }}
                  />
                  <label
                    htmlFor={`status-${status}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div className="">
          <h2 className="text-2xl font-bold">
            {filteredTransactions.length || 0} Transactions
          </h2>
          <p className={textPrimary}>
            Your transactions for{" "}
            {format(dateRange[0].startDate, "MMM d, yyyy")} -{" "}
            {format(dateRange[0].endDate, "MMM d, yyyy")}
          </p>
        </div>
        <div className="flex gap-3">
          {isDesktop ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="button-secondary flex gap-2 text-black items-center cursor-pointer">
                  Filter{" "}
                  {activeFilterCount > 0 && (
                    <span className="bg-black text-sm py-[1px] px-2 rounded-full text-white">
                      {activeFilterCount}
                    </span>
                  )}{" "}
                  <ChevronDown
                    size={20}
                    color="#000000"
                    strokeWidth={0.5}
                    absoluteStrokeWidth
                  />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="p-6">
                <SheetHeader>
                  <SheetTitle className="font-bold md:text-2xl">
                    Filter
                  </SheetTitle>
                </SheetHeader>
                <FilterContent />
              </SheetContent>
            </Sheet>
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <button className="button-secondary flex gap-1 text-black items-center">
                  Filter{" "}
                  {activeFilterCount > 0 && (
                    <span className="bg-black text-sm py-[1px] px-2 rounded-full text-white">
                      {activeFilterCount}
                    </span>
                  )}{" "}
                  <ChevronDown
                    size={20}
                    color="#000000"
                    strokeWidth={0.5}
                    absoluteStrokeWidth
                  />
                </button>
              </DrawerTrigger>
              <DrawerContent className="p-4">
                <DrawerHeader>
                  <DrawerTitle>Filter</DrawerTitle>
                </DrawerHeader>
                <FilterContent />
              </DrawerContent>
            </Drawer>
          )}

          <button className="button-secondary flex gap-1 text-black items-center">
            Export list <Download className="w-3 h-3" />
          </button>
        </div>
      </div>

      <Separator className="my-4" />

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-red-500 text-center py-4">
          Error loading transactions
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No transactions match your filters</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSelectedTransactionTypes([]);
              setSelectedStatuses([]);
              setDateRange([
                {
                  startDate: new Date(2022, 1, 1),
                  endDate: new Date(2022, 3, 30),
                  key: "selection",
                },
              ]);
              setActiveDateFilter(null);
            }}
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <ul className="space-y-6 pb-12">
          {filteredTransactions.map((tx, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span
                  className={`p-2 rounded-full flex items-center justify-center ${
                    tx.type === "deposit"
                      ? "bg-[#E3FCF2] size-12 text-green-500"
                      : "bg-[#F9E3E0] size-12 text-red-500"
                  }`}
                >
                  {tx.type === "deposit" ? (
                    <MoveDownLeft size={20} color="#075132" strokeWidth={0.8} />
                  ) : (
                    <MoveUpRight size={20} color="#961100" strokeWidth={0.8} />
                  )}
                </span>
                <div className="flex flex-col justify-between">
                  <p className="font-medium">
                    {tx.metadata?.product_name ||
                      (tx.type === "withdrawal"
                        ? "Cash withdrawal"
                        : "Payment")}
                  </p>
                  {tx.metadata?.name && tx.status !== "successful" && (
                    <p className={textPrimary}>{tx.metadata.name}</p>
                  )}
                  <p
                    className={`text-sm font-medium text-justify ${
                      tx.status === "successful"
                        ? "text-[#0EA163]"
                        : "text-[#A77A07]"
                    }`}
                  >
                    {tx.status}
                  </p>
                </div>
              </div>

              <div className="text-right flex flex-col gap-1">
                <p className="font-bold">USD {tx.amount}</p>
                <p className={textPrimary}>
                  {new Date(tx.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
