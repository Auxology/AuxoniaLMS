import 'server-only';

import { requireUser } from '@/features/payment/data/require-user';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { LessonContentData } from '../types/lesson-content-response';

export async function getLessonContent(lessonId: string): Promise<LessonContentData> {
    const session = await requireUser();

    const lesson = await prisma.lesson.findFirst({
        where: {
            id: lessonId,
        },
        select: {
            id: true,
            title: true,
            description: true,
            thumbnailKey: true,
            videoKey: true,
            position: true,
            lessonProgresses: {
                where: {
                    userId: session.user.id,
                },
                select: {
                    id: true,
                    completed: true,
                }
            },
            chapter: {
                select: {
                    courseId: true,
                    course: {
                        select: {
                            slug: true,
                        },
                    },
                },
            },
       },
    });

    if (!lesson) {
        notFound();
    }

    const enrolled = await prisma.enrollment.findFirst({
        where: {
            userId: session.user.id,
            courseId: lesson.chapter.courseId,
        },
    });

    if (!enrolled || enrolled.status !== 'Active') {
        notFound();
    }

    return lesson;
}
