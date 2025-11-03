"use client";

import React from "react";
import { Users, TrendingUp, FileText, Eye, Sparkles } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    title: "Total Users",
    value: "12,345",
    icon: Users,
    trend: "+12.5% from last month",
    trendUp: true,
  },
  {
    title: "Page Views",
    value: "45,678",
    icon: Eye,
    trend: "+8.2% from last month",
    trendUp: true,
  },
  {
    title: "Total Posts",
    value: "892",
    icon: FileText,
    trend: "+4.3% from last month",
    trendUp: true,
  },
  {
    title: "Engagement",
    value: "68.4%",
    icon: TrendingUp,
    trend: "-2.1% from last month",
    trendUp: false,
  },
];
const highlightMetrics = [
  {
    label: "Active stories",
    value: "128",
    helper: "+8 this week",
  },
  {
    label: "Pending approvals",
    value: "14",
    helper: "Review before 6 PM",
  },
  {
    label: "Newsletter CTR",
    value: "4.8%",
    helper: "+0.6% vs last send",
  },
];

const chartData = [
  { name: "Jan", views: 4000, users: 2400 },
  { name: "Feb", views: 3000, users: 1398 },
  { name: "Mar", views: 2000, users: 9800 },
  { name: "Apr", views: 2780, users: 3908 },
  { name: "May", views: 1890, users: 4800 },
  { name: "Jun", views: 2390, users: 3800 },
  { name: "Jul", views: 3490, users: 4300 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {highlightMetrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {metric.label}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {metric.value}
                </p>
                <p className="text-xs text-gray-500">{metric.helper}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* User Growth Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly user acquisition trends</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Page Views Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Page Views</CardTitle>
            <CardDescription>
              Traffic overview for the past 7 months
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#dc2626"
                  strokeWidth={2}
                  dot={{ fill: "#dc2626", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
