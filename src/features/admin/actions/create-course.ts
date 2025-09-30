'use server';

import prisma from '@/lib/prisma';
import { courseSchema, CourseSchemaType } from '@/lib/zod-schemas';
import { CreateCourseResponse } from '../types/create-course-types';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function CreateCourse(input: CourseSchemaType): Promise<CreateCourseResponse> {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
    
        const validation = courseSchema.safeParse(input);

        if (!validation.success) {
            return { status: 'error', message: validation.error.message };
        }

        await prisma.course.create({
            data: {
                ...validation.data,
                userId: session?.user.id,
            },
        });

        return { status: 'success', message: 'Course created successfully' };
    } catch (error) {
        console.error('Create course error:', error);
        return { status: 'error', message: 'Failed to create course' };
    }
}
