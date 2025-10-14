import { getEnrolledCourses } from '@/features/dashboard/data/get-enrolled-courses';
import { getAllCourses } from '@/features/marketing/data/get-all-courses';

export default async function DashboardPage() {
    const [courses, enrolledCourses] = await Promise.all([getAllCourses(), getEnrolledCourses()]);

    return (
        <>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Enrolled Courses</h1>
                <p className="text-sm text-muted-foreground">
                    Here you can see all the courses you are enrolled in.
                </p>
            </div>
        </>
    );
}
