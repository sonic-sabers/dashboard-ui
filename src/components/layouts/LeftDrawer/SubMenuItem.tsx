export function SubMenuItem({ label }: { label: string }) {
  return (
    <div
      className="
        px-3 py-2 text-[14px] font-normal
        text-gray-600 dark:text-gray-500
        hover:text-gray-900 dark:hover:text-gray-300
        cursor-pointer transition-all duration-200
        hover:translate-x-1
      "
    >
      {label}
    </div>
  );
}
