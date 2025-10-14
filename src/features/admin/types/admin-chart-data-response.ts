export type ChartDataPoint = {
    date: string;
    enrollments: number;
};

export type AdminChartDataResponse = {
    chartData: ChartDataPoint[];
    totalEnrollments: number;
};
