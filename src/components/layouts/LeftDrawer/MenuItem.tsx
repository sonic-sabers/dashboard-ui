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
        group flex items-center gap-1 px-3 py-2 rounded-lg cursor-pointer
        transition-all duration-200 relative overflow-hidden
        ${
          active
            ? "bg-[#F5F5F5] dark:bg-[#404040] text-[#1C1C1C] dark:text-white"
            : " dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#404040] hover:text-[#1C1C1C] dark:hover:text-white"
        }
        active:scale-[0.98]  /* tap feedback */
      `}
    >
      {/* Active indicator bar on left - always rendered, visibility controlled by CSS */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200 bg-[#1C1C1C] dark:bg-[#C6C7F8]
          ${active ? "opacity-100" : "opacity-0"}
        `}
        style={{
          width: "4px",
          height: "16px",
        }}
      />

      {/* Chevron hover animation - always rendered, visibility controlled by CSS */}
      <ChevronRight
        className={`w-4 h-4 flex-shrink-0 -ml-1 transition-all duration-200 ${
          !active ? "opacity-40" : "opacity-0"
        }`}
      />

      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-lg opacity-0 group-active:opacity-10 bg-black dark:bg-white transition-opacity duration-200"></span>

      {/* Icon micro interaction */}
      <div className="flex items-center flex-shrink-0 transition-transform duration-200 group-hover:scale-[1.12] group-hover:translate-x-[1px]">
        {icon}
      </div>

      {/* Label with subtle fade/slide on hover */}
      <span className="text-[14px] font-normal leading-5 flex items-center transition-all duration-200 group-hover:opacity-90 group-hover:translate-x-[1px]">
        {label}
      </span>
    </div>
  );
}
