'use server';

import { requireAdmin } from '../data/require-admin';
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

export async function deleteCourse(courseId: string): Promise<DeleteLessonResponse> {
    const session = await requireAdmin();

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

        await prisma.course.delete({
            where: { id: courseId },
        });

        revalidatePath('/admin/course');

        return { status: 'success', message: 'Course deleted successfully' };
    } catch {
        return { status: 'error', message: 'Failed to delete course' };
    }
}
