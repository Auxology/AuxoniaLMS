'use server';

import arcjet from '@/lib/arcjet';
import { requireAdmin } from '../data/require-admin';
import { lessonSchema, LessonSchemaType } from '../types/new-lesson-modal-schema';
import { detectBot, fixedWindow, request } from '@arcjet/next';
import { CreateChapterResponse } from '../types/admin-action-response';
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

export async function createLesson(input: LessonSchemaType): Promise<CreateChapterResponse> {
    const session = await requireAdmin();

    try {
        const req = await request();

        const decision = await aj.protect(req, { fingerprint: session.user.id });

        const validation = lessonSchema.safeParse(input);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return { status: 'error', message: 'Too many requests' };
            } else {
                return { status: 'error', message: 'Malicious activity detected' };
            }
        }

        if (!validation.success) return { status: 'error', message: validation.error.message };

        await prisma.$transaction(async tx => {
            const maxPos = await tx.lesson.findFirst({
                where: {
                    chapterId: validation.data.chapterId,
                },
                select: {
                    position: true,
                },
                orderBy: {
                    position: 'desc',
                },
            });

            await tx.lesson.create({
                data: {
                    title: validation.data.name,
                    chapterId: validation.data.chapterId,
                    position: (maxPos?.position ?? 0) + 1,
                    description: validation.data.description,
                    videoKey: validation.data.videoKey,
                    thumbnailKey: validation.data.thumbnailKey,
                },
            });

            revalidatePath(`/admin/course/${validation.data.courseId}/edit`);
        });

        return { status: 'success', message: 'Lesson created successfully.' };
    } catch {
        return { status: 'error', message: 'Failed to create lesson' };
    }
}
