import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function StatCard({ title, value, icon: Icon, trend, trendUp }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-5 w-5 text-red-600" />}
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p
            className={`text-xs ${trendUp ? "text-green-600" : "text-red-600"}`}
          >
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
