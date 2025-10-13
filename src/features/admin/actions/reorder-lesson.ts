'use server';

import prisma from '@/lib/prisma';
import { AdminActionResponse } from '../types/admin-action-response';
import { revalidatePath } from 'next/cache';
import { detectBot, fixedWindow } from '@arcjet/next';
import arcjet from '@/lib/arcjet';
import { RequireAdmin } from '../data/require-admin';

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

export async function reorderLesson(
    chapterId: string,
    lessons: { id: string; position: number }[],
    courseId: string
): Promise<AdminActionResponse> {
    const session = await RequireAdmin();

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
