'use server';

import { AdminCourseCard } from '@/features/admin/components/admin-course-card';
import { CourseCardSkeleton } from '@/features/admin/components/course-card-skeleton';
import { CoursesEmptyState } from '@/features/admin/components/courses-empty-state';
import { adminGetCourses } from '@/features/admin/data/admin-get-courses';
import { Suspense } from 'react';

export default async function CoursesPage() {
    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Your Courses</h1>

            <Suspense fallback={<CourseSkeletonGrid />}>
                <RenderCourses />
            </Suspense>
        </>
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

async function RenderCourses() {
    const data = await adminGetCourses();

    if (data.length === 0) {
        return <CoursesEmptyState />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-7">
            {data.map(course => (
                <AdminCourseCard key={course.id} data={course} />
            ))}
        </div>
    );
}
