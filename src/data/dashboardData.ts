import {
  DashboardMetric,
  Product,
  LocationData,
  SalesData,
  RevenueData,
} from "@/types";

// Dashboard Metrics
export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Customers",
    value: "3,781",
    change: 11.01,
    trend: "up",
    bgColor: "var(--metric-card-1)",
    textColor: "#1c1c1c",
  },
  {
    label: "Orders",
    value: "1,219",
    change: -0.03,
    trend: "down",
    bgColor: "var(--metric-card-2)",
    textColor: "var(--metric-card-text)",
    link: "/dashboard/order-list",
  },
  {
    label: "Revenue",
    value: "$695",
    change: 15.03,
    trend: "up",
    bgColor: "var(--metric-card-3)",
    textColor: "var(--metric-card-text)",
  },
  {
    label: "Growth",
    value: "30.1%",
    change: 6.08,
    trend: "up",
    bgColor: "var(--metric-card-4)",
    textColor: "#1c1c1c",
  },
];

// Revenue Data
export const revenueData: RevenueData[] = [
  { week: "Jan", current: 10000, previous: 15000 },
  { week: "Feb", current: 25000, previous: 20000 },
  { week: "Mar", current: 18000, previous: 25000 },
  { week: "Apr", current: 22000, previous: 18000 },
  { week: "May", current: 28000, previous: 22000 },
  { week: "Jun", current: 30000, previous: 28000 },
];

export const currentWeekRevenue = "$58,211";
export const previousWeekRevenue = "$68,768";

// Top Selling Products
export const topProducts: Product[] = [
  {
    id: "1",
    name: "ASOS Ridley High Waist",
    price: 79.49,
    quantity: 82,
    amount: 6518.18,
  },
  {
    id: "2",
    name: "Marco Lightweight Shirt",
    price: 128.5,
    quantity: 37,
    amount: 4754.5,
  },
  {
    id: "3",
    name: "Half Sleeve Shirt",
    price: 39.99,
    quantity: 64,
    amount: 2559.36,
  },
  {
    id: "4",
    name: "Lightweight Jacket",
    price: 20.0,
    quantity: 184,
    amount: 3680.0,
  },
  {
    id: "5",
    name: "Marco Shoes",
    price: 79.49,
    quantity: 64,
    amount: 1965.81,
  },
];

// Revenue by Location
export const revenueByLocation: LocationData[] = [
  { city: "New York", value: "72K" },
  { city: "San Francisco", value: "39K" },
  { city: "Sydney", value: "25K" },
  { city: "Singapore", value: "61K" },
];

// Total Sales Data
export const totalSalesData: SalesData[] = [
  { channel: "Direct", value: 300.56, color: "#1C1C1C", darkColor: "#C6C7F8" },
  {
    channel: "Affiliate",
    value: 135.18,
    color: "#B1E3FF",
    darkColor: "#B1E3FF",
  },
  {
    channel: "Sponsored",
    value: 154.02,
    color: "#BAEDBD",
    darkColor: "#BAEDBD",
  },
  { channel: "E-mail", value: 48.96, color: "#95A4FC", darkColor: "#95A4FC" },
];

// Projections vs Actuals Data
export const projectionsData = [
  { month: "Jan", projections: 15, actuals: 5 },
  { month: "Feb", projections: 20, actuals: 5 },
  { month: "Mar", projections: 17, actuals: 4 },
  { month: "Apr", projections: 22, actuals: 6 },
  { month: "May", projections: 15, actuals: 3 },
  { month: "Jun", projections: 20, actuals: 5 },
];
