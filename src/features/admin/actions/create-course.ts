'use server';

import prisma from '@/lib/prisma';
import { courseSchema, CourseSchemaType } from '@/lib/zod-schemas';
import type { CreateCourseResponse } from '../types/admin-action-response';
import { RequireAdmin } from '../data/require-admin';
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

export async function CreateCourse(input: CourseSchemaType): Promise<CreateCourseResponse> {
    const session = await RequireAdmin();

    try {
        const req = await request();
        const decision = await aj.protect(req, { fingerprint: session.user.id });

        const validation = courseSchema.safeParse(input);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return { status: 'error', message: 'Too many requests' };
            } else {
                return { status: 'error', message: 'Malicious activity detected' };
            }
        }

        if (!validation.success) {
            return { status: 'error', message: validation.error.message };
        }

        await prisma.course.create({
            data: {
                ...validation.data,
                userId: session.user.id,
            },
        });

        return { status: 'success', message: 'Course created successfully' };
    } catch  {
        return { status: 'error', message: 'Failed to create course' };
    }
}
