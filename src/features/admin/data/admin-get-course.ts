import 'server-only';

import { RequireAdmin } from './require-admin';
import prisma from '@/lib/prisma';
import { ExplicitAdminCourse } from '../types/admin-get-courses-type';
import { notFound } from 'next/navigation';

export async function AdminGetCourse(id: string): Promise<ExplicitAdminCourse> {
    await RequireAdmin();

    const data = await prisma.course.findUnique({
        where: {
            id: id,
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
            description: true,
            category: true,
            chapters: {
                select: {
                    id: true,
                    title: true,
                    position: true,
                    lessons: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            thumbnailKey: true,
                            videoKey: true,
                            position: true,
                        },
                    },
                },
            },
        },
    });

    if (!data) return notFound();

    return data;
}
