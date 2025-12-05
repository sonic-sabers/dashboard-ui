// Dashboard Types
export interface DashboardMetric {
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  bgColor?: string;
  textColor?: string;
  link?: string;
}

export interface RevenueData {
  week: string;
  current: number;
  previous: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  amount: number;
}

export interface LocationData {
  city: string;
  value: string;
  coordinates?: [number, number];
}

export interface SalesData {
  channel: string;
  value: number;
  color: string;
  darkColor?: string; // Optional dark mode color
}

// Notification Types
export interface Notification {
  id: string;
  type: "bug" | "user" | "subscription" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Activity Types
export interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  timestamp: string;
  type: "bug" | "version" | "data" | "page";
}

// Contact Types
export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
}

// Order Types
export interface Order {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  project: string;
  address: string;
  date: string;
  status: "In Progress" | "Complete" | "Pending" | "Approved" | "Rejected";
}

// Theme Types
export type Theme = "light" | "dark";

// Chart Types
export interface ChartDataPoint {
  label: string;
  value: number;
}

// Filter Types
export interface FilterOptions {
  search: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  page: number;
  pageSize: number;
}
