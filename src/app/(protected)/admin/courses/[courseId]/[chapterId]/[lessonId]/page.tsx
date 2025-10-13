'use server';

import { LessonForm } from '@/features/admin/components/forms/lesson-form';
import { AdminGetLesson } from '@/features/admin/data/admin-get-lesson';

type Params = Promise<{ courseId: string; chapterId: string; lessonId: string }>;

export default async function LessonIdPage({ params }: { params: Params }) {
    const { courseId, chapterId, lessonId } = await params;

    const lesson = await AdminGetLesson(lessonId);

    return <LessonForm data={lesson} chapterId={chapterId} courseId={courseId} />;
}
