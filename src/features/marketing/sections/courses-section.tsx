import { Suspense } from 'react';
import { PublicCourseCard } from '../components/public-course-card';
import { PublicCourseCardSkeleton } from '../components/public-course-card-skeleton';
import { GetAllCourses } from '../data/get-all-courses';

export async function CoursesSection() {
    return (
        <div className="py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
                        Explore Our Courses
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
                        Discover our comprehensive collection of courses designed to enhance your
                        skills and knowledge across various subjects.
                    </p>
                </div>

                <Suspense fallback={<RenderCoursesSkeleton />}>
                    <RenderCourses />
                </Suspense>
            </div>
        </div>
    );
}

async function RenderCourses() {
    const data = await GetAllCourses();

    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map(course => (
                <PublicCourseCard key={course.id} data={course} />
            ))}
        </div>
    );
}

function RenderCoursesSkeleton() {
    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
                <PublicCourseCardSkeleton key={index} />
            ))}
        </div>
    );
}
