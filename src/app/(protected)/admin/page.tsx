import { AppSidebar } from '@/features/admin/components/admin-sidebar'
import { ChartAreaInteractive } from '@/features/admin/components/admin-chart-area'
import { DataTable } from '@/features/admin/components/admin-data-table'
import { SectionCards } from '@/features/admin/components/admin-section-cards'
import { SiteHeader } from '@/features/admin/components/admin-site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { headers } from 'next/headers'

import data from '@/features/admin/json/data.json'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
    const session = await auth.api.getSession({
        query: {
            disableCookieCache: true,
        },
        headers: await headers(),
    })

    if (!session) {
        return redirect('/login')
    }

    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards />
                            <div className="px-4 lg:px-6">
                                <ChartAreaInteractive />
                            </div>
                            <DataTable data={data} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
