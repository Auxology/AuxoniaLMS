import 'server-only';

import prisma from '@/lib/prisma';
import { requireAdmin } from './require-admin';
import { AdminGetStatsResponse } from '../types/admin-get-stats-response';

export async function adminGetStats(): Promise<AdminGetStatsResponse> {
    await requireAdmin();

    const [totalUsers, totalPayingUsers, totalCourses, totalLessons] = await Promise.all([
        prisma.user.count(),

        prisma.user.count({
            where: {
                stripeCustomerId: {
                    not: null,
                },
            },
        }),

        prisma.course.count(),

        prisma.lesson.count(),
    ]);

    return {
        totalUsers,
        totalPayingUsers,
        totalCourses,
        totalLessons,
    };
}
