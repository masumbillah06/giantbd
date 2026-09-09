"use client"

import { Building2 } from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"

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

export const description = "Warehouse Stock Distribution Pie Chart"

const chartData = [
  { warehouse: "mirpur1", label: "Mirpur 1", stock: 36500, fill: "var(--chart-1)" },
  { warehouse: "mirpur2", label: "Mirpur 2", stock: 27800, fill: "var(--chart-2)" },
  { warehouse: "solimuddin", label: "Solimuddin", stock: 18400, fill: "var(--chart-3)" },
  { warehouse: "savar", label: "Savar FG", stock: 14200, fill: "var(--chart-4)" },
  { warehouse: "gazipur", label: "Gazipur Unit", stock: 9600, fill: "var(--chart-5)" },
]

const chartConfig = {
  stock: {
    label: "Stock Units",
  },
  mirpur1: {
    label: "Mirpur 1",
    color: "var(--chart-1)",
  },
  mirpur2: {
    label: "Mirpur 2",
    color: "var(--chart-2)",
  },
  solimuddin: {
    label: "Solimuddin",
    color: "var(--chart-3)",
  },
  savar: {
    label: "Savar FG",
    color: "var(--chart-4)",
  },
  gazipur: {
    label: "Gazipur Unit",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartPieSimple() {
  return (
    <Card className="h-full w-full flex flex-col justify-between overflow-hidden shadow-xs">
      <CardHeader className="px-5 pt-4 pb-0 shrink-0">
        <CardTitle>Warehouse Stock Share</CardTitle>
        <CardDescription>Inventory proportion by warehouse facility</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 w-full px-2 sm:px-4 py-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full aspect-auto flex items-center justify-center [&_.recharts-responsive-container]:!h-full [&_.recharts-responsive-container]:!w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="warehouse" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="stock"
              nameKey="warehouse"
              outerRadius="75%"
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  stroke="var(--background)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="warehouse" className="flex-wrap gap-2 pt-2 text-[11px]" />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="px-5 py-2.5 shrink-0 flex items-center justify-between border-t bg-muted/20 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400">
          <Building2 className="h-4 w-4" />
          5 Active Facilities
        </div>
        <div>Top: Mirpur 1 (34.2%)</div>
      </CardFooter>
    </Card>
  )
}
