import { getCourseSidebarData } from "@/features/dashboard/data/get-course-sidebar-data";
import { redirect } from "next/navigation";

interface DashboardPageProps {
    params: Promise<{ slug: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
    const { slug } = await params;
    const course = await getCourseSidebarData(slug);
    const firstChapter = course.chapters[0];
    const firstLesson = firstChapter.lessons[0];
    
    
    if(firstLesson) {
        return redirect(`/dashboard/${slug}/${firstLesson.id}`);
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-md mx-auto">
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-2xl font-bold">No lessons found</h1>
                </div>
            </div>
        </div>
    )
}
