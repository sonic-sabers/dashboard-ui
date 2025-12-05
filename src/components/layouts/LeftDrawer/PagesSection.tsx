import { User, CreditCard, Users, FileText, MessageCircle } from "lucide-react";
import { useState } from "react";
import { MenuItem } from "./MenuItem";
import { MenuItemWithSubmenu } from "./MenuItemWithSubmenu";
import { SubMenuItem } from "./SubMenuItem";

export function PagesSection({
  onClose,
  isMobile,
}: {
  onClose?: () => void;
  isMobile?: boolean;
}) {
  const [userProfileOpen, setUserProfileOpen] = useState(false);

  return (
    <div>
      <h3 className="text-[14px] font-normal leading-5 text-gray-900/40 dark:text-white/40 mb-4">
        Pages
      </h3>
      <nav className="space-y-1">
        <MenuItemWithSubmenu
          icon={<User className="w-5 h-5" />}
          label="User Profile"
          isOpen={userProfileOpen}
          onToggle={() => setUserProfileOpen(!userProfileOpen)}
        >
          <SubMenuItem label="Overview" />
          <SubMenuItem label="Projects" />
          <SubMenuItem label="Campaigns" />
          <SubMenuItem label="Documents" />
          <SubMenuItem label="Followers" />
        </MenuItemWithSubmenu>
        <MenuItem icon={<CreditCard className="w-5 h-5" />} label="Account" />
        <MenuItem icon={<Users className="w-5 h-5" />} label="Corporate" />
        <MenuItem icon={<FileText className="w-5 h-5" />} label="Blog" />
        <MenuItem icon={<MessageCircle className="w-5 h-5" />} label="Social" />
      </nav>
    </div>
  );
}
