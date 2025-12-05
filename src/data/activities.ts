import { Activity } from "@/types";

export const activities: Activity[] = [
  {
    id: "1",
    user: {
      name: "User",
      avatar: "/avatars/user1.png",
    },
    action: "You have a bug that needs...",
    timestamp: "Just now",
    type: "bug",
  },
  {
    id: "2",
    user: {
      name: "Developer",
      avatar: "/avatars/user2.png",
    },
    action: "Released a new version",
    timestamp: "59 minutes ago",
    type: "version",
  },
  {
    id: "3",
    user: {
      name: "Admin",
      avatar: "/avatars/user3.png",
    },
    action: "Submitted a bug",
    timestamp: "12 hours ago",
    type: "bug",
  },
  {
    id: "4",
    user: {
      name: "Manager",
      avatar: "/avatars/user4.png",
    },
    action: "Modified A data in Page X",
    timestamp: "Today, 11:59 AM",
    type: "data",
  },
  {
    id: "5",
    user: {
      name: "Designer",
      avatar: "/avatars/user5.png",
    },
    action: "Deleted a page in Project X",
    timestamp: "Feb 2, 2023",
    type: "page",
  },
];
