import { getLessonContent } from '@/features/dashboard/data/get-lesson-content';
import { CourseContent } from '@/features/dashboard/components/course-content';
import { CourseContentSkeleton } from '@/features/dashboard/components/course-content-skeleton';
import { Suspense } from 'react';

interface LessonPageProps {
    params: Promise<{ lessonId: string }>;
}

async function LessonContent({ lessonId }: { lessonId: string }) {
    const data = await getLessonContent(lessonId);
    return <CourseContent data={data} />;
}

export default async function LessonPage({ params }: LessonPageProps) {
    const { lessonId } = await params;

    return (
        <div>
            <Suspense fallback={<CourseContentSkeleton />}>
                <LessonContent lessonId={lessonId} />
            </Suspense>
        </div>
    );
}
