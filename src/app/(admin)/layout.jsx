"use client";

import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function AdminLayout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
