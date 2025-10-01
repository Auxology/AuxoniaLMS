'use server';

import { Button } from '@/components/ui/button';
import { AdminCourseCard } from '@/features/admin/components/admin-course-card';
import { AdminGetCourses } from '@/features/admin/data/admin-get-courses';
import Link from 'next/link';

export default async function CoursesPage() {
    const data = await AdminGetCourses();
    
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your Courses</h1>

                <Link href="/admin/courses/create">
                    <Button>Create Course</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-7">
                {data.map(course => (
                    <AdminCourseCard key={course.id} data={course} />
                ))}
            </div>
        </>
    );
}
