import React, { useEffect, useRef } from "react";
import { Bug, UserPlus, Radio } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import Drawer from "./Drawer";
import { notifications } from "@/data/notifications";
import { activities } from "@/data/activities";
import { contacts } from "@/data/contacts";

export default function RightDrawer({
  open,
  overlay,
  highlightNotifications = false,
}: {
  open: boolean;
  overlay: boolean;
  highlightNotifications?: boolean;
}) {
  const notificationsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightNotifications && notificationsSectionRef.current) {
      notificationsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [highlightNotifications]);

  return (
    <Drawer side="right" open={open} overlay={overlay}>
      <div className="h-full overflow-y-auto p-1 pt-4">
        <div className="space-y-4">
          <Section
            ref={notificationsSectionRef}
            title="Notifications"
            highlight={highlightNotifications}
          >
            {notifications.map((notification) => {
              const getIcon = () => {
                switch (notification.type) {
                  case "bug":
                    return (
                      <Bug
                        className="w-4 h-4"
                        style={{ width: "16px", height: "16px" }}
                      />
                    );
                  case "user":
                    return (
                      <UserPlus
                        className="w-4 h-4"
                        style={{ width: "16px", height: "16px" }}
                      />
                    );
                  case "subscription":
                    return (
                      <Radio
                        className="w-4 h-4"
                        style={{ width: "16px", height: "16px" }}
                      />
                    );
                  default:
                    return (
                      <Bug
                        className="w-4 h-4"
                        style={{ width: "16px", height: "16px" }}
                      />
                    );
                }
              };

              const getIconBg = () => {
                switch (notification.type) {
                  case "bug":
                    return "bg-[#E3F5FF] dark:bg-[#E3F5FF]";
                  case "user":
                    return "bg-[#E3F5FF] dark:bg-[#E3F5FF]";
                  case "subscription":
                    return "bg-[#E3F5FF] dark:bg-[#E3F5FF]";
                  default:
                    return "bg-[#E3F5FF] dark:bg-[#E3F5FF]";
                }
              };

              return (
                <NotificationItem
                  key={notification.id}
                  icon={getIcon()}
                  iconBg={getIconBg()}
                  title={notification.title}
                  time={notification.timestamp}
                />
              );
            })}
          </Section>

          {/* Activities Section */}
          <Section title="Activities">
            {activities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                avatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user.name}`}
                title={activity.action}
                time={activity.timestamp}
                isLast={index === activities.length - 1}
              />
            ))}
          </Section>

          {/* Contacts Section */}
          <Section title="Contacts">
            {contacts.map((contact) => (
              <ContactItem
                key={contact.id}
                avatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`}
                name={contact.name}
              />
            ))}
          </Section>
        </div>
      </div>
    </Drawer>
  );
}

const Section = React.forwardRef<
  HTMLDivElement,
  {
    title: string;
    children: React.ReactNode;
    highlight?: boolean;
  }
>(({ title, children, highlight = false }, ref) => {
  return (
    <motion.div
      ref={ref}
      className="space-y-2 md:space-y-3 rounded-lg transition-all duration-300"
      animate={{
        backgroundColor: highlight
          ? "rgba(59, 130, 246, 0.1)"
          : "rgba(0, 0, 0, 0)",
        scale: highlight ? 1.02 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      style={{
        padding: highlight ? "12px" : "0px",
      }}
    >
      <h2 className="text-sm font-semibold px-2 text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="space-y-1 md:space-y-2">{children}</div>
    </motion.div>
  );
});

Section.displayName = "Section";

function NotificationItem({
  icon,
  iconBg,
  title,
  time,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
      <div
        className={`flex items-center justify-center flex-shrink-0 ${iconBg}`}
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "3px",
          padding: "4px",
        }}
      >
        <div className="text-[#1C1C1C]">{icon}</div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col" style={{ width: "192px" }}>
        <p
          className="font-normal text-gray-900 dark:text-white truncate"
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 400,
          }}
        >
          {title}
        </p>
        <p
          className="font-normal text-gray-900/40 dark:text-white/40"
          style={{
            fontSize: "12px",
            lineHeight: "18px",
            fontWeight: 400,
          }}
        >
          {time}
        </p>
      </div>
    </div>
  );
}

function ActivityItem({
  avatar,
  title,
  time,
  isLast = false,
}: {
  avatar: string;
  title: string;
  time: string;
  isLast?: boolean;
}) {
  return (
    <div className="relative flex items-start gap-2 md:gap-3 py-1 pl-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
      {!isLast && (
        <div className="absolute left-[17.5px] mt-1 md:left-[18px] top-10 bottom-[-6px] w-[1px] bg-gray-900/10 dark:bg-white/10 z-0" />
      )}

      <Image
        src={avatar}
        alt=""
        width={28}
        height={28}
        className="w-7 h-7 rounded-full flex-shrink-0 relative z-10"
      />
      <div className="flex-1 min-w-0">
        <p className="text-[14px] leading-[20px] tracking-[0%] font-normal text-gray-900 dark:text-white truncate">
          {title}
        </p>
        <p className="text-[12px] leading-[18px] tracking-[0%] font-normal text-gray-900/40 dark:text-white/40">
          {time}
        </p>
      </div>
    </div>
  );
}

function ContactItem({ avatar, name }: { avatar: string; name: string }) {
  return (
    <div className="flex items-center gap-2 md:gap-3 p-1.5  rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
      <Image
        src={avatar}
        alt={name}
        width={24}
        height={24}
        className="w-6 h-6 rounded-full flex-shrink-0"
      />
      <p className="text-[14px] leading-[20px] tracking-[0%] font-normal text-gray-900 dark:text-white truncate">
        {name}
      </p>
    </div>
  );
}
