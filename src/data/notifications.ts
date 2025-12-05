import { Notification } from "@/types";

export const notifications: Notification[] = [
  {
    id: "1",
    type: "bug",
    title: "You have a bug that needs...",
    message: "You have a bug that needs attention",
    timestamp: "Just now",
    read: false,
  },
  {
    id: "2",
    type: "user",
    title: "New user registered",
    message: "A new user has registered",
    timestamp: "59 minutes ago",
    read: false,
  },
  {
    id: "3",
    type: "bug",
    title: "You have a bug that needs...",
    message: "You have a bug that needs attention",
    timestamp: "12 hours ago",
    read: false,
  },
  {
    id: "4",
    type: "subscription",
    title: "Andi Lane subscribed to you",
    message: "Andi Lane has subscribed to your updates",
    timestamp: "Today, 11:59 AM",
    read: false,
  },
];
