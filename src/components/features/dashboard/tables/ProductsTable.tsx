"use client";

import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-2xl bg-white dark:bg-gray-800 p-6 border border-gray-100 dark:border-gray-700/50"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Top Selling Products
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Price
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Quantity
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                className={cn(
                  "border-b border-gray-100 dark:border-gray-700/50 last:border-0",
                  "hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer"
                )}
              >
                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">
                  {product.name}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {product.quantity}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">
                  $
                  {product.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
