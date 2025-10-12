'use server';

import { RequireAdmin } from '../data/require-admin';
import { DeleteLessonResponse } from '../types/admin-action-response';
import { detectBot, fixedWindow, request } from '@arcjet/next';
import arcjet from '@/lib/arcjet';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const aj = arcjet
    .withRule(
        detectBot({
            mode: 'LIVE',
            allow: [],
        })
    )
    .withRule(
        fixedWindow({
            mode: 'LIVE',
            window: '1m',
            max: 5,
        })
    );

interface DeleteLessonProps {
    courseId: string;
    chapterId: string;
    lessonId: string;
}

export async function DeleteLessonAction({
    courseId,
    chapterId,
    lessonId,
}: DeleteLessonProps): Promise<DeleteLessonResponse> {
    const session = await RequireAdmin();

    try {
        const req = await request();
        const decision = await aj.protect(req, { fingerprint: session.user.id });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return { status: 'error', message: 'Too many requests' };
            } else {
                return { status: 'error', message: 'Malicious activity detected' };
            }
        }

        const chapterWithLessons = await prisma.chapter.findUnique({
            where: {
                id: chapterId,
            },
            select: {
                lessons: {
                    orderBy: {
                        position: 'asc',
                    },
                    select: {
                        id: true,
                        position: true,
                    },
                },
            },
        });

        if (!chapterWithLessons) return { status: 'error', message: 'Chapter not found' };

        const lessons = chapterWithLessons.lessons;

        const lessonToDelete = lessons.find(lesson => lesson.id === lessonId);

        if (!lessonToDelete) return { status: 'error', message: 'Lesson not found' };

        const remainingLessons = lessons.filter(lesson => lesson.id !== lessonId);

        const updates = remainingLessons.map((lesson, index) => {
            return prisma.lesson.update({
                where: { id: lesson.id },
                data: {
                    position: index + 1,
                },
            });
        });

        await prisma.$transaction([
            ...updates,
            prisma.lesson.delete({ where: { id: lessonId, chapterId: chapterId } }),
        ]);

        revalidatePath(`/admin/courses/${courseId}/edit`);

        return { status: 'success', message: 'Lesson deleted successfully' };
    } catch {
        return { status: 'error', message: 'Failed to delete lesson' };
    }
}
