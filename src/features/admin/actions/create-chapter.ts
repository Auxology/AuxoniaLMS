'use server';

import arcjet from '@/lib/arcjet';
import { requireAdmin } from '../data/require-admin';
import { chapterSchema, ChapterSchemaType } from '../types/new-chapter-modal-schema';
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

export async function createChapter(input: ChapterSchemaType): Promise<CreateChapterResponse> {
    const session = await requireAdmin();

    try {
        const req = await request();

        const decision = await aj.protect(req, { fingerprint: session.user.id });

        const validation = chapterSchema.safeParse(input);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return { status: 'error', message: 'Too many requests' };
            } else {
                return { status: 'error', message: 'Malicious activity detected' };
            }
        }

        if (!validation.success) return { status: 'error', message: validation.error.message };

        await prisma.$transaction(async tx => {
            const maxPos = await tx.chapter.findFirst({
                where: {
                    courseId: validation.data.courseId,
                },
                select: {
                    position: true,
                },
                orderBy: {
                    position: 'desc',
                },
            });

            await tx.chapter.create({
                data: {
                    title: validation.data.name,
                    courseId: validation.data.courseId,
                    position: (maxPos?.position ?? 0) + 1,
                },
            });

            revalidatePath(`/admin/course/${validation.data.courseId}/edit`);
        });

        return { status: 'success', message: 'Chapter created successfully.' };
    } catch {
        return { status: 'error', message: 'Failed to create chapter' };
    }
}
