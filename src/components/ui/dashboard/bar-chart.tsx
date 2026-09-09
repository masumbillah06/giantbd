"use client"

import { Package, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"

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
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "Stock Volume by Material Type"

const chartData = [
  { material: "Poly", quantity: 45200, fill: "var(--chart-1)" },
  { material: "Cotton", quantity: 38400, fill: "var(--chart-2)" },
  { material: "Denim", quantity: 29800, fill: "var(--chart-3)" },
  { material: "Spandex", quantity: 21500, fill: "var(--chart-4)" },
  { material: "Viscose", quantity: 18300, fill: "var(--chart-5)" },
  { material: "Silk", quantity: 12400, fill: "var(--chart-6)" },
]

const chartConfig = {
  quantity: {
    label: "Stock Quantity",
  },
  Poly: { label: "Poly", color: "var(--chart-1)" },
  Cotton: { label: "Cotton", color: "var(--chart-2)" },
  Denim: { label: "Denim", color: "var(--chart-3)" },
  Spandex: { label: "Spandex", color: "var(--chart-4)" },
  Viscose: { label: "Viscose", color: "var(--chart-5)" },
  Silk: { label: "Silk", color: "var(--chart-6)" },
} satisfies ChartConfig

export function ChartBarDefault() {
  return (
    <Card className="h-full w-full flex flex-col justify-between overflow-hidden shadow-xs">
      <CardHeader className="px-5 pt-4 pb-0 shrink-0">
        <CardTitle>Stock by Material</CardTitle>
        <CardDescription>Finished goods volume by fabric material</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 w-full px-2 sm:px-4 py-1">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full aspect-auto [&_.recharts-responsive-container]:!h-full [&_.recharts-responsive-container]:!w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 15, right: 15, left: -10, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="material"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.2 }}
              content={<ChartTooltipContent nameKey="material" hideLabel />}
            />
            <Bar dataKey="quantity" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="px-5 py-2.5 shrink-0 flex items-center justify-between border-t bg-muted/20 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400">
          <Package className="h-4 w-4" />
          Poly represents 27.3% volume
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          Top Category
        </div>
      </CardFooter>
    </Card>
  )
}
