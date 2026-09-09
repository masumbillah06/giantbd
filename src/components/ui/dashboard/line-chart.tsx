"use client"

import { TrendingUp, ArrowUpRight } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "Monthly Inventory Movement Trends"

const chartData = [
  { month: "January", stockIn: 12400, stockOut: 8500, available: 19500 },
  { month: "February", stockIn: 15600, stockOut: 11200, available: 23900 },
  { month: "March", stockIn: 18200, stockOut: 14800, available: 27300 },
  { month: "April", stockIn: 13900, stockOut: 16100, available: 25100 },
  { month: "May", stockIn: 21500, stockOut: 15400, available: 31200 },
  { month: "June", stockIn: 24800, stockOut: 17900, available: 38100 },
  { month: "July", stockIn: 28100, stockOut: 20300, available: 45900 },
  { month: "August", stockIn: 23600, stockOut: 19100, available: 50400 },
  { month: "September", stockIn: 32000, stockOut: 22800, available: 59600 },
]

const chartConfig = {
  available: {
    label: "Available Stock",
    color: "var(--chart-1)",
  },
  stockIn: {
    label: "Stock In (Received)",
    color: "var(--chart-2)",
  },
  stockOut: {
    label: "Stock Out (Issued)",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartLineMultiple() {
  return (
    <Card className="h-full w-full flex flex-col justify-between overflow-hidden shadow-xs">
      <CardHeader className="px-5 pt-4 pb-0 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Inventory Movement Trends</CardTitle>
            <CardDescription>
              Monthly Stock Inflow, Outflow & Total Available Units (2026)
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <ArrowUpRight className="h-3.5 w-3.5" />
            +18.4% YTD
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 w-full px-2 sm:px-4 py-1">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full aspect-auto [&_.recharts-responsive-container]:!h-full [&_.recharts-responsive-container]:!w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 15,
              right: 25,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              cursor={{ stroke: "var(--color-border)", strokeWidth: 1, strokeDasharray: "4 4" }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="available"
              type="monotone"
              stroke="var(--color-available)"
              strokeWidth={3}
              dot={{ fill: "var(--color-available)", r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="stockIn"
              type="monotone"
              stroke="var(--color-stockIn)"
              strokeWidth={2.5}
              dot={{ fill: "var(--color-stockIn)", r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="stockOut"
              type="monotone"
              stroke="var(--color-stockOut)"
              strokeWidth={2.5}
              dot={{ fill: "var(--color-stockOut)", r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="px-5 py-2.5 shrink-0 flex items-center justify-between border-t bg-muted/20 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="h-4 w-4" />
          Stock inflow up 15.2% this month
        </div>
        <div>Total Available: 59,600 Units</div>
      </CardFooter>
    </Card>
  )
}
