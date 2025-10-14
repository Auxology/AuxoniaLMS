'use server';

import prisma from '@/lib/prisma';
import { AdminActionResponse } from '../types/admin-action-response';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '../data/require-admin';

export async function reorderChapter(
    chapters: { id: string; position: number }[],
    courseId: string
): Promise<AdminActionResponse> {
    await requireAdmin();

    try {
        if (!chapters || chapters.length === 0)
            return { status: 'error', message: 'No chapters to reorder' };

        const updatePromises = chapters.map(chapter =>
            prisma.chapter.update({
                where: {
                    id: chapter.id,
                    courseId: courseId,
                },
                data: {
                    position: chapter.position,
                },
            })
        );

        await prisma.$transaction(updatePromises);

        revalidatePath(`/admin/courses/${courseId}/edit`);

        return { status: 'success', message: 'Chapters reordered successfully' };
    } catch {
        return { status: 'error', message: 'Failed to reorder chapters' };
    }
}
