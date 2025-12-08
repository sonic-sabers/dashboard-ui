import {
  PieChart,
  ShoppingBag,
  FolderOpen,
  BookOpen,
  ShoppingCart,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { MenuItem } from "./MenuItem";

export function DashboardsSection({
  onClose,
  isMobile,
}: {
  onClose?: () => void;
  isMobile?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div>
      <h3 className="text-[14px] font-normal leading-5 text-gray-900/40 dark:text-white/40 mb-4">
        Dashboards
      </h3>
      <nav className="space-y-1">
        <MenuItem
          icon={<PieChart className="w-5 h-5" />}
          label="Default"
          active={pathname === "/dashboard"}
          href="/dashboard"
          onClick={isMobile && onClose ? onClose : undefined}
        />
        <MenuItem
          icon={<ShoppingCart className="w-5 h-5" />}
          label="Orders"
          active={pathname === "/dashboard/order-list"}
          href="/dashboard/order-list"
          onClick={isMobile && onClose ? onClose : undefined}
        />
        <MenuItem
          icon={<FolderOpen className="w-5 h-5" />}
          label="Projects"
          active={pathname === "/dashboard/projects"}
          href="/dashboard/projects"
          onClick={isMobile && onClose ? onClose : undefined}
        />
        <MenuItem
          icon={<ShoppingBag className="w-5 h-5" />}
          label="eCommerce"
        />
        <MenuItem
          icon={<BookOpen className="w-5 h-5" />}
          label="Online Courses"
        />
      </nav>
    </div>
  );
}
