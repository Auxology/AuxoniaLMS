import { buttonVariants } from '@/components/ui/button';
import { AdminCourseCard } from '@/features/admin/components/admin-course-card';
import { CourseCardSkeleton } from '@/features/admin/components/course-card-skeleton';
import { CoursesEmptyState } from '@/features/admin/components/courses-empty-state';
import { adminGetRecentCourses } from '@/features/admin/data/admin-get-recent-courses';
import Link from 'next/link';
import { Suspense } from 'react';

export const RecentCoursesSection = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Recent Courses</h2>
                <Link className={buttonVariants({ variant: 'outline' })} href="/admin/courses">
                    View All
                </Link>
            </div>

            <Suspense fallback={<CourseSkeletonGrid />}>
                <RenderRecentCourses />
            </Suspense>
        </div>
    );
};

async function RenderRecentCourses() {
    const courses = await adminGetRecentCourses();

    if (courses.length === 0) {
        return <CoursesEmptyState />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-7">
            {courses.map(course => (
                <AdminCourseCard key={course.id} data={course} />
            ))}
        </div>
    );
}

function CourseSkeletonGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-7">
            {Array.from({ length: 4 }).map((_, index) => (
                <CourseCardSkeleton key={index} />
            ))}
        </div>
    );
}
