import 'server-only';

import { requireAdmin } from './require-admin';
import prisma from '@/lib/prisma';

export async function adminGetRecentCourses() {
    await requireAdmin();

    const courses = await prisma.course.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 2,
        select: {
            id: true,
            title: true,
            smallDescription: true,
            duration: true,
            level: true,
            status: true,
            price: true,
            fileKey: true,
            slug: true,
        },
    });

    return courses;
}
