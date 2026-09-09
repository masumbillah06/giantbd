"use client"

import { ShieldCheck } from "lucide-react"
import { Cell, Label, Pie, PieChart } from "recharts"

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

export const description = "Stock Aging Distribution Donut Chart"

const chartData = [
  { tier: "green", label: "Green (0-30d)", stock: 48500, fill: "var(--chart-2)" },
  { tier: "yellow", label: "Yellow (31-90d)", stock: 24200, fill: "var(--chart-3)" },
  { tier: "red", label: "Red (90+d)", stock: 11300, fill: "#ef4444" },
  { tier: "blocked", label: "Blocked", stock: 6800, fill: "var(--chart-4)" },
  { tier: "reserved", label: "Reserved", stock: 9200, fill: "var(--chart-1)" },
]

const chartConfig = {
  stock: {
    label: "Stock Units",
  },
  green: {
    label: "Green (0-30d)",
    color: "var(--chart-2)",
  },
  yellow: {
    label: "Yellow (31-90d)",
    color: "var(--chart-3)",
  },
  red: {
    label: "Red (90+d)",
    color: "#ef4444",
  },
  blocked: {
    label: "Blocked",
    color: "var(--chart-4)",
  },
  reserved: {
    label: "Reserved",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartPieDonut() {
  return (
    <Card className="h-full w-full flex flex-col justify-between overflow-hidden shadow-xs">
      <CardHeader className="px-5 pt-4 pb-0 shrink-0">
        <CardTitle>Stock Aging Health</CardTitle>
        <CardDescription>Inventory classification by aging tiers</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 w-full px-2 sm:px-4 py-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full aspect-auto flex items-center justify-center [&_.recharts-responsive-container]:!h-full [&_.recharts-responsive-container]:!w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="tier" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="stock"
              nameKey="tier"
              innerRadius="50%"
              outerRadius="75%"
              paddingAngle={3}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  stroke="var(--background)"
                  strokeWidth={2}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 5}
                          className="fill-foreground text-xl font-bold font-heading"
                        >
                          100K
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 15}
                          className="fill-muted-foreground text-[11px] font-medium"
                        >
                          Total Units
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="tier" className="flex-wrap gap-2 pt-2 text-[11px]" />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="px-5 py-2.5 shrink-0 flex items-center justify-between border-t bg-muted/20 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="h-4 w-4" />
          72.7% Healthy (Green & Yellow)
        </div>
        <div>Red: 11.3K Units</div>
      </CardFooter>
    </Card>
  )
}
