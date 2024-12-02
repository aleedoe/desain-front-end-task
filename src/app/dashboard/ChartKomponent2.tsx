"use client";

import { Pie, PieChart } from "recharts";

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

// Data untuk distribusi jenis kelamin
const chartData = [
    { gender: "Laki-laki", count: 450, fill: "var(--color-male)" },
    { gender: "Perempuan", count: 550, fill: "var(--color-female)" },
];

// Konfigurasi label untuk jenis kelamin
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

export function Component2() {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Diagram Pai</CardTitle>
                <CardDescription>Komposisi penduduk laki-laki dan perempuan.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        {/* Tooltip untuk menampilkan informasi detail */}
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        {/* Diagram Pie */}
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="gender"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
