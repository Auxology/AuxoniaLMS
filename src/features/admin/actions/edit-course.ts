'use server';

import { courseSchema, CourseSchemaType } from '@/lib/zod-schemas';
import { RequireAdmin } from '../data/require-admin';
import { AdminActionResponse } from '../types/admin-action-response';
import prisma from '@/lib/prisma';
import arcjet from '@/lib/arcjet';
import { detectBot, fixedWindow, request } from '@arcjet/next';

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

export async function EditCourse(data: CourseSchemaType, id: string): Promise<AdminActionResponse> {
    const user = await RequireAdmin();

    try {
        const req = await request();

        const decision = await aj.protect(req, { fingerprint: user.user.id });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return { status: 'error', message: 'Too many requests' };
            } else {
                return { status: 'error', message: 'Malicious activity detected' };
            }
        }

        const result = courseSchema.safeParse(data);

        if (!result.success) {
            return { status: 'error', message: result.error.message };
        }

        await prisma.course.update({
            where: { id: id, userId: user.user.id },
            data: { ...result.data, updatedAt: new Date() },
        });

        return { status: 'success', message: 'Course updated successfully' };
    } catch {
        return { status: 'error', message: 'Failed to update course' };
    }
}
