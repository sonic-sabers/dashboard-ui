"use client";

import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DataTable } from "@/components/orders-table/data-table";
import { orders } from "@/data/orders";

export default function OrderList() {
  const [copyStates, setCopyStates] = useState<Record<string, string>>({});
  const [copiedAddresses, setCopiedAddresses] = useState<
    Record<string, boolean>
  >({});

  const handleCopyOrder = async (orderId: string) => {
    setCopyStates((prev) => ({ ...prev, [orderId]: "loading" }));

    try {
      await navigator.clipboard.writeText(orderId);
      setCopyStates((prev) => ({ ...prev, [orderId]: "success" }));

      setTimeout(() => {
        setCopyStates((prev) => {
          const newStates = { ...prev };
          delete newStates[orderId];
          return newStates;
        });
      }, 2000);
    } catch (error) {
      setCopyStates((prev) => {
        const newStates = { ...prev };
        delete newStates[orderId];
        return newStates;
      });
    }
  };

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddresses((prev) => ({ ...prev, [address]: true }));

      setTimeout(() => {
        setCopiedAddresses((prev) => {
          const newStates = { ...prev };
          delete newStates[address];
          return newStates;
        });
      }, 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  return (
    <TooltipProvider>
      <div className="p-4  space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
            Order List
          </h1>
        </div>

        <DataTable
          data={orders}
          copyStates={copyStates}
          onCopyOrder={handleCopyOrder}
          copiedAddresses={copiedAddresses}
          onCopyAddress={handleCopyAddress}
        />
      </div>
    </TooltipProvider>
  );
}
