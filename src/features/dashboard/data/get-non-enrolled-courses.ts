import { requireUser } from '@/features/payment/data/require-user';
import prisma from '@/lib/prisma';

export async function getNonEnrolledCourses() {
    const session = await requireUser();

    const data = await prisma.course.findMany({
        where: {
            status: 'Published',
            enrollments: {
                none: {
                    userId: session.user.id,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            title: true,
            price: true,
            smallDescription: true,
            slug: true,
            fileKey: true,
            duration: true,
            level: true,
            category: true,
        },
    });

    return data;
}
