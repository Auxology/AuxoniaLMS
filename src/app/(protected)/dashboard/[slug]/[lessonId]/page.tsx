import { getLessonContent } from '@/features/dashboard/data/get-lesson-content';
import { CourseContent } from '@/features/dashboard/components/course-content';

interface LessonPageProps {
    params: Promise<{ lessonId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
    const { lessonId } = await params;

    const data = await getLessonContent(lessonId);

    return (
        <div>
            <CourseContent data={data} />
        </div>
    );
}
