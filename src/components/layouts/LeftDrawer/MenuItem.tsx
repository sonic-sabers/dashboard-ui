import { ChevronRight } from "lucide-react";

export function MenuItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer
        transition-all duration-200 relative overflow-hidden
        ${
          active
            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            : "text-gray-900/40 dark:text-white/40 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
        }
        active:scale-[0.98]  /* tap feedback */
      `}
    >
      {/* Active indicator bar on left - always rendered, visibility controlled by CSS */}
      <span
        className={`absolute left-0 top-[8px] w-1 h-4 bg-gray-900 dark:bg-white rounded-full transition-opacity duration-200 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Chevron hover animation - always rendered, visibility controlled by CSS */}
      <ChevronRight
        className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${
          active
            ? "opacity-0"
            : "opacity-0 group-hover:opacity-40 group-hover:translate-x-1"
        }`}
      />

      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-lg opacity-0 group-active:opacity-10 bg-black dark:bg-white transition-opacity duration-200"></span>

      {/* Icon micro interaction */}
      <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-[1.12] group-hover:translate-x-[1px]">
        {icon}
      </div>

      {/* Label with subtle fade/slide on hover */}
      <span className="text-[14px] font-normal leading-5 transition-all duration-200 group-hover:opacity-90 group-hover:translate-x-[1px]">
        {label}
      </span>
    </div>
  );
}
