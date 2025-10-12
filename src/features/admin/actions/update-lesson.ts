'use server';

import arcjet from '@/lib/arcjet';
import { RequireAdmin } from '../data/require-admin';
import { lessonSchema, LessonSchemaType } from '../types/new-lesson-modal-schema';
import { detectBot, fixedWindow, request } from '@arcjet/next';
import { UpdateLessonResponse } from '../types/admin-action-response';
import prisma from '@/lib/prisma';

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

export async function UpdateLesson(
    input: LessonSchemaType,
    lessonId: string
): Promise<UpdateLessonResponse> {
    const session = await RequireAdmin();

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

        await prisma.lesson.update({
            where: { id: lessonId },
            data: {
                title: input.name,
                description: input.description,
                thumbnailKey: input.thumbnailKey,
                videoKey: input.videoKey,
            },
        });

        return { status: 'success', message: 'Lesson updated successfully.' };
    } catch {
        return { status: 'error', message: 'Failed to update lesson' };
    }
}
