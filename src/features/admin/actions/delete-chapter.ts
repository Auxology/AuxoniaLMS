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

interface DeleteChapterProps {
    courseId: string;
    chapterId: string;
}

export async function DeleteChapterAction({
    courseId,
    chapterId,
}: DeleteChapterProps): Promise<DeleteLessonResponse> {
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

        const courseWithChapters = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                chapters: {
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

        if (!courseWithChapters) return { status: 'error', message: 'Course not found' };

        const chapters = courseWithChapters.chapters;

        const chapterToDelete = chapters.find(chapter => chapter.id === chapterId);

        if (!chapterToDelete) return { status: 'error', message: 'Chapter not found' };

        const remainingChapters = chapters.filter(chapter => chapter.id !== chapterId);

        const updates = remainingChapters.map((chapter, index) => {
            return prisma.chapter.update({
                where: { id: chapter.id },
                data: {
                    position: index + 1,
                },
            });
        });

        await prisma.$transaction([
            ...updates,
            prisma.chapter.delete({ where: { id: chapterId, courseId: courseId } }),
        ]);

        revalidatePath(`/admin/courses/${courseId}/edit`);

        return { status: 'success', message: 'Chapter deleted successfully' };
    } catch {
        return { status: 'error', message: 'Failed to delete chapter' };
    }
}
