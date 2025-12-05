import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-white">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The dashboard page you are looking for does not exist.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
