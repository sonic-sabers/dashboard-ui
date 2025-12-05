"use client";

import { motion } from "motion/react";
import { FolderKanban } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Projects
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage and track all your projects in one place
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-12"
      >
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
          <FolderKanban className="h-12 w-12 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No Projects Yet
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
          Get started by creating your first project. Track progress, manage
          teams, and collaborate effectively.
        </p>
        <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          Create New Project
        </button>
      </motion.div>
    </div>
  );
}
