import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
  whiteBg?: boolean;
}

export function SectionHeader({ title, className,whiteBg }: SectionHeaderProps) {
  return (
    <h3
      className={cn(
        "text-sm font-semibold text-gray-900 dark:text-white",
        className
      )}
    >
      {title}
    </h3>
  );
}
