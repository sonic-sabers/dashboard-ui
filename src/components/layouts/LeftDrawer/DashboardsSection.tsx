import {
  PieChart,
  ShoppingBag,
  FolderOpen,
  BookOpen,
  ShoppingCart,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { MenuItem } from "./MenuItem";

export function DashboardsSection({
  onClose,
  isMobile,
}: {
  onClose?: () => void;
  isMobile?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
    // Close drawer on mobile after navigation
    if (isMobile && onClose) {
      onClose();
    }
  };

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
          onClick={() => handleNavigation("/dashboard")}
        />
        <MenuItem
          icon={<ShoppingCart className="w-5 h-5" />}
          label="Orders"
          active={pathname === "/dashboard/order-list"}
          onClick={() => handleNavigation("/dashboard/order-list")}
        />
        <MenuItem
          icon={<FolderOpen className="w-5 h-5" />}
          onClick={() => handleNavigation("/dashboard/projects")}
          label="Projects"
          active={pathname === "/dashboard/projects"}
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
