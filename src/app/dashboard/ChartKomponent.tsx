"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// Data yang diubah berdasarkan rentang usia
const chartData = [
    { ageGroup: "0-9", male: 450, female: 300 },
    { ageGroup: "10-19", male: 380, female: 420 },
    { ageGroup: "20-29", male: 520, female: 120 },
    { ageGroup: "30-39", male: 140, female: 550 },
    { ageGroup: "40-49", male: 600, female: 350 },
    { ageGroup: "50-59", male: 480, female: 400 },
];

// Konfigurasi label untuk Laki-laki dan Perempuan
const chartConfig = {
    male: {
        label: "Laki-laki",
        color: "hsl(var(--chart-1))",
    },
    female: {
        label: "Perempuan",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function ChartPertama() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Diagram Batang - Usia</CardTitle>
                <CardDescription>
                    Distribusi usia berdasarkan Jenis kelamin.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        {/* Ubah dataKey ke "ageGroup" untuk rentang usia */}
                        <XAxis
                            dataKey="ageGroup"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <Bar
                            dataKey="male"
                            stackId="a"
                            fill="var(--color-male)"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="female"
                            stackId="a"
                            fill="var(--color-female)"
                            radius={[4, 4, 0, 0]}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    hideLabel
                                    className="w-[180px]"
                                    formatter={(value, name, item, index) => (
                                        <>
                                            <div
                                                className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                                                style={
                                                    {
                                                        "--color-bg": `var(--color-${name})`,
                                                    } as React.CSSProperties
                                                }
                                            />
                                            {chartConfig[name as keyof typeof chartConfig]?.label ||
                                                name}
                                            <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                {value}
                                            </div>
                                            {/* Menambahkan Total jika ini adalah elemen terakhir */}
                                            {index === 1 && (
                                                <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                                                    Total
                                                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                        {item.payload.male + item.payload.female}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                />
                            }
                            cursor={false}
                            defaultIndex={1}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
