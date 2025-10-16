'use server';

import { requireUser } from '@/features/payment/data/require-user';
import { DashboardActionResponse } from '../types/dashboard-action-response';
import arcjet from '@/lib/arcjet';
import { detectBot, fixedWindow, request } from '@arcjet/next';
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

export async function markLessonComplete(
    lessonId: string,
    slug: string
): Promise<DashboardActionResponse> {
    const session = await requireUser();

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

        await prisma.lessonProgress.upsert({
            where: {
                userId_lessonId: {
                    userId: session.user.id,
                    lessonId: lessonId,
                },
            },
            update: {
                completed: true,
            },
            create: {
                userId: session.user.id,
                lessonId: lessonId,
                completed: true,
            },
        });

        revalidatePath(`/dashboard/${slug}`);

        return { status: 'success', message: 'Lesson marked complete' };
    } catch {
        return { status: 'error', message: 'Failed to mark lesson complete' };
    }
}
