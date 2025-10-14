import 'server-only';

import { requireUser } from '@/features/payment/data/require-user';
import prisma from '@/lib/prisma';
import { EnrolledCoursesResponse } from '../types/enrolled-courses-response';

export async function getEnrolledCourses(): Promise<EnrolledCoursesResponse[]> {
    const session = await requireUser();

    const data = await prisma.enrollment.findMany({
        where: {
            userId: session.user.id,
            status: 'Active',
        },
        select: {
            Course: {
                select: {
                    id: true,
                    smallDescription: true,
                    title: true,
                    fileKey: true,
                    level: true,
                    slug: true,
                    duration: true,
                    chapters: {
                        select: {
                            id: true,
                            lessons: {
                                select: {
                                    id: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    return data;
}
