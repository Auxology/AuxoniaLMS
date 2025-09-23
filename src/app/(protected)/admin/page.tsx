import { ChartAreaInteractive } from '@/features/admin/components/admin-chart-area'
import { DataTable } from '@/features/admin/components/admin-data-table'
import { SectionCards } from '@/features/admin/components/admin-section-cards'
import data from '@/features/admin/json/data.json'

export default function AdminIndexPage() {
    return (
        <>
            <SectionCards />
            <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
        </>
    )
}
