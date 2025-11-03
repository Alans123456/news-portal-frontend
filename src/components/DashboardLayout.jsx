"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileImage,
  FileText,
  Search,
  Sparkles,
  ArrowUpRight,
  Settings,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  {
    label: "Overview",
    view: "overview",
    icon: LayoutDashboard,
    description: "Realtime performance snapshot",
  },
  {
    label: "Audience",
    view: "audience",
    icon: Users,
    description: "Growth and engagement metrics",
  },
  {
    label: "Content",
    view: "content",
    icon: FileText,
    description: "Manage stories and authors",
  },
  {
    label: "Media",
    view: "media",
    icon: FileImage,
    description: "Library and asset reviews",
  },
  {
    label: "Reports",
    view: "reports",
    icon: BarChart3,
    description: "Insights and export tools",
  },
];

const quickActions = [
  {
    label: "Create story",
    href: "/dashboard?view=content&action=new",
  },
  {
    label: "Invite editor",
    href: "/dashboard?view=audience&action=invite",
  },
  {
    label: "Upload assets",
    href: "/dashboard?view=media&action=upload",
  },
];

const cn = (...classes) => classes.filter(Boolean).join(" ");

export function DashboardLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [showActions, setShowActions] = useState(false);

  const currentView = searchParams.get("view") ?? "overview";

  const links = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        href:
          item.view === "overview"
            ? "/dashboard"
            : `/dashboard?view=${item.view}`,
        active: pathname.startsWith("/dashboard") && currentView === item.view,
      })),
    [pathname, currentView]
  );

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center px-4">
          <Link
            href="/dashboard"
            className="text-lg font-semibold tracking-tight"
          >
            News Admin
          </Link>
        </div>
        <nav className="flex-1 space-y-2 px-3 py-4">
          {links.map((item) => (
            <Link
              key={item.view}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                item.active
                  ? "bg-red-500 text-white shadow-lg shadow-red-100"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4",
                  item.active
                    ? "text-white"
                    : "text-gray-400 group-hover:text-gray-600"
                )}
              />
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-medium">{item.label}</span>
                <span
                  className={cn(
                    "truncate text-xs",
                    item.active
                      ? "text-red-100"
                      : "text-gray-400 group-hover:text-gray-500"
                  )}
                >
                  {item.description}
                </span>
              </div>
              <ArrowUpRight className="ml-auto h-4 w-4 text-transparent group-hover:text-gray-300" />
            </Link>
          ))}
        </nav>
        <div className="border-t border-gray-200 px-3 py-4">
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-red-100 p-2 text-red-600">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  Upgrade workspace
                </p>
                <p className="text-xs text-gray-500">
                  Unlock automated insights and scheduled executive reports for
                  your newsroom.
                </p>
                <Link
                  href="/dashboard?view=reports&plan=pro"
                  className="inline-flex text-xs font-semibold text-red-600 hover:text-red-700"
                >
                  Explore plans
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-3 py-4">
          <Link
            href="/dashboard?view=settings"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            <Settings className="h-4 w-4" /> Workspace settings
          </Link>
        </div>
      </Sidebar>
      <div className="flex flex-1 flex-col bg-slate-50">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Admin panel
              </p>
              <h1 className="text-xl font-semibold text-gray-900">
                Newsroom control center
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:flex">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search analytics, posts, or authors"
                className="h-10 w-64 rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
              />
            </div>
            <div className="relative hidden md:inline-flex">
              <button
                onClick={() => setShowActions((prev) => !prev)}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-500 px-4 text-sm font-semibold text-white shadow hover:bg-red-600"
              >
                <Sparkles className="h-4 w-4" /> Quick actions
              </button>
              {showActions && (
                <div className="absolute right-0 top-12 z-20 w-48 rounded-lg border border-gray-200 bg-white py-2 text-sm shadow-lg">
                  {quickActions.map((action) => (
                    <Link
                      key={action.label}
                      href={action.href}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 transition hover:bg-gray-100 hover:text-red-600"
                      onClick={() => setShowActions(false)}
                    >
                      <Sparkles className="h-4 w-4 text-red-500" />
                      {action.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <ThemeToggle />
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-semibold text-white">
                NA
              </div>
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-sm font-semibold text-gray-900">
                  News Admin
                </span>
                <span className="text-xs text-gray-500">
                  editor@newsportal.com
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Quick actions</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-red-300 hover:text-red-600"
              >
                <Sparkles className="h-4 w-4 text-red-500" />
                {action.label}
              </Link>
            ))}
          </div>
        </div>
        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
