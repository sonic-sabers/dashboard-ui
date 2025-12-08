import { ChevronRight, ChevronDown } from "lucide-react";

export function MenuItemWithSubmenu({
  icon,
  label,
  isOpen,
  onToggle,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        onClick={onToggle}
        className="
          flex items-center gap-1 px-3 py-2 rounded-lg
          cursor-pointer transition-all duration-200
          text-gray-900 dark:text-white
          hover:bg-[#F5F5F5] dark:hover:bg-[#404040]
          active:scale-[0.98]
          group
        "
      >
        {/* Chevron animation */}
        {isOpen ? (
          <ChevronDown className="w-4 h-4 -ml-1 flex-shrink-0 transition-transform duration-200 group-hover:translate-y-[1px] opacity-40" />
        ) : (
          <ChevronRight className="w-4 h-4 -ml-1 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-[2px] opacity-40" />
        )}

        {/* Icon micro-interaction */}
        <div className="flex items-center flex-shrink-0 transition-transform duration-200 group-hover:scale-[1.12] group-hover:translate-x-[1px]">
          {icon}
        </div>

        {/* Text animation */}
        <span className="text-[14px] font-normal leading-5 flex items-center transition-all duration-200 group-hover:opacity-90 group-hover:translate-x-[1px]">
          {label}
        </span>
      </div>

      {isOpen && (
        <div className="ml-11 mt-1 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200 ease-out">
          {children}
        </div>
      )}
    </div>
  );
}
