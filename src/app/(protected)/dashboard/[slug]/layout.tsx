import { CourseSidebar } from '@/features/dashboard/components/sidebar/course-sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
    const { slug } = await params;

    return (
        <div className="flex flex-1">
            <div className="w-80 border-r border-border shrink-0">
                <CourseSidebar slug={slug} />
            </div>

            <div className="flex-1 overflow-hidden">{children}</div>
        </div>
    );
}
