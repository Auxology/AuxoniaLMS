'use server';

import { courseSchema, CourseSchemaType } from '@/lib/zod-schemas';
import { RequireAdmin } from '../data/require-admin';
import { AdminActionResponse } from '../types/admin-action-response';
import prisma from '@/lib/prisma';

export async function EditCourse(data: CourseSchemaType, id: string): Promise<AdminActionResponse> {
    const user = await RequireAdmin();

    try {
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
