import { getEnrolledCourses } from '@/features/dashboard/data/get-enrolled-courses';
import { EnrolledCoursesEmptyState } from '@/features/dashboard/components/enrolled-courses-empty-state';
import { getNonEnrolledCourses } from '@/features/dashboard/data/get-non-enrolled-courses';
import { AvailableCoursesEmptyState } from '@/features/dashboard/components/available-courses-empty-state';
import { PublicCourseCard } from '@/features/marketing/components/public-course-card';
import Link from 'next/link';
import { CourseProgressCard } from '@/features/dashboard/components/course-progress-card';

export default async function DashboardPage() {
    const [courses, enrolledCourses] = await Promise.all([
        getNonEnrolledCourses(),
        getEnrolledCourses(),
    ]);

    return (
        <>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Enrolled Courses</h1>
                <p className="text-sm text-muted-foreground">
                    Here you can see all the courses you are enrolled in.
                </p>
            </div>

            {enrolledCourses.length === 0 ? (
                <EnrolledCoursesEmptyState />
            ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {enrolledCourses.map(enrollment => (
                        <CourseProgressCard
                            key={enrollment.course.id}
                            data={enrollment}
                        />
                    ))}
                </div>
            )}

            <section className="mt-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">Available Courses</h1>
                    <p className="text-sm text-muted-foreground">
                        Here you can see all the courses you can enroll in.
                    </p>
                </div>

                {courses.length === 0 ? (
                    <AvailableCoursesEmptyState />
                ) : (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {courses.map(course => (
                            <PublicCourseCard key={course.id} data={course} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
