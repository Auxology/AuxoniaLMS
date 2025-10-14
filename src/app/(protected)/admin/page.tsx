import { ChartAreaInteractive } from '@/features/admin/components/sidebar/admin-chart-area';
import { SectionCards } from '@/features/admin/components/sidebar/admin-section-cards';
import { RecentCoursesSection } from '@/features/admin/components/recent-courses-section';
import { adminGetChartData } from '@/features/admin/data/admin-get-chart-data';

export default async function AdminIndexPage() {
    const chartData = await adminGetChartData();

    return (
        <>
            <SectionCards />
            <ChartAreaInteractive data={chartData} />
            <RecentCoursesSection />
        </>
    );
}
