'use server';

import prisma from '@/lib/prisma';
import { AdminActionResponse } from '../types/admin-action-response';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '../data/require-admin';

export async function reorderLesson(
    chapterId: string,
    lessons: { id: string; position: number }[],
    courseId: string
): Promise<AdminActionResponse> {
    await requireAdmin();

    try {
        if (!lessons || lessons.length === 0)
            return { status: 'error', message: 'No lessons to reorder' };

        const updatePromises = lessons.map(lesson =>
            prisma.lesson.update({
                where: {
                    id: lesson.id,
                    chapterId: chapterId,
                },
                data: {
                    position: lesson.position,
                },
            })
        );

        await prisma.$transaction(updatePromises);

        revalidatePath(`/admin/courses/${courseId}/edit`);

        return { status: 'success', message: 'Lessons reordered successfully' };
    } catch {
        return { status: 'error', message: 'Failed to reorder lessons' };
    }
}
