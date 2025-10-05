import { AppSidebar } from '@/features/admin/components/sidebar/admin-sidebar';
import { SiteHeader } from '@/features/admin/components/sidebar/admin-site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { RequireAdmin } from '@/features/admin/data/require-admin';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // Ensure user is authenticated and has admin role
    await RequireAdmin();
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
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                            {children}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
