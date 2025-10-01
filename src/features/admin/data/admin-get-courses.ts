import prisma from '@/lib/prisma';
import { RequireAdmin } from './require-admin';
import { AdminGetCoursesResult } from '../types/admin-get-courses-type';

export async function AdminGetCourses(): Promise<AdminGetCoursesResult> {
    await RequireAdmin();

    const data = await prisma.course.findMany({
        orderBy: {
            createdAt: 'desc',
        },
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

    return data;
}
