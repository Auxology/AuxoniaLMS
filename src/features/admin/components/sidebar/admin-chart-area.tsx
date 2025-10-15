'use client';

import * as React from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { useIsMobile } from '@/features/shared/hooks/use-mobile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AdminChartDataResponse } from '../../types/admin-chart-data-response';

const chartConfig: ChartConfig = {
    enrollments: {
        label: 'Enrollments',
        color: 'hsl(var(--chart-1))',
    },
};

interface ChartAreaInteractiveProps {
    data: AdminChartDataResponse;
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
    const [chartType, setChartType] = React.useState<'area' | 'bar'>('area');
    const [timeRange, setTimeRange] = React.useState<'7d' | '30d'>('30d');
    const isMobile = useIsMobile();

    const filteredData = React.useMemo(() => {
        if (timeRange === '7d') {
            return data.chartData.slice(-7);
        }
        return data.chartData;
    }, [data.chartData, timeRange]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return isMobile
            ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <Card className="@container/card">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Total Enrollments</CardTitle>
                        <CardDescription>
                            <span className="hidden @[540px]/card:block">
                                Total enrollments for the last {timeRange === '7d' ? '7' : '30'}{' '}
                                days: {data.totalEnrollments}.
                            </span>
                            <span className="block @[540px]/card:hidden">
                                Last {timeRange === '7d' ? '7' : '30'} days: {data.totalEnrollments}
                            </span>
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select
                            value={timeRange}
                            onValueChange={(value: '7d' | '30d') => setTimeRange(value)}
                        >
                            <SelectTrigger className="w-[100px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7d">7 days</SelectItem>
                                <SelectItem value="30d">30 days</SelectItem>
                            </SelectContent>
                        </Select>
                        <ToggleGroup
                            type="single"
                            value={chartType}
                            onValueChange={(value: 'area' | 'bar') => setChartType(value || 'area')}
                            className="hidden @[540px]/card:flex"
                        >
                            <ToggleGroupItem value="area" aria-label="Area chart">
                                Area
                            </ToggleGroupItem>
                            <ToggleGroupItem value="bar" aria-label="Bar chart">
                                Bar
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    {chartType === 'area' ? (
                        <AreaChart
                            margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
                            data={filteredData}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={formatDate}
                                minTickGap={32}
                                className="text-xs"
                            />
                            <YAxis tickLine={false} axisLine={false} className="text-xs" />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Area
                                dataKey="enrollments"
                                type="natural"
                                fill="var(--color-enrollments)"
                                fillOpacity={0.4}
                                stroke="var(--color-enrollments)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    ) : (
                        <BarChart
                            margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
                            data={filteredData}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={formatDate}
                                minTickGap={32}
                                className="text-xs"
                            />
                            <YAxis tickLine={false} axisLine={false} className="text-xs" />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="enrollments" fill="var(--color-enrollments)" radius={4} />
                        </BarChart>
                    )}
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
