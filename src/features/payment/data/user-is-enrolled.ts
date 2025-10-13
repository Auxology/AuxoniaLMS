'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

export async function checkIfUserIsEnrolled(courseId: string): Promise<boolean> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return false;
    }

    const enrollment = await prisma.enrollment.findUnique({
        where: {
            userId_courseId: {
                userId: session.user.id,
                courseId: courseId,
            },
        },
        select: {
            id: true,
            status: true,
        },
    });

    return enrollment?.status === 'Active';
}
