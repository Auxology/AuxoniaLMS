import 'server-only';

import prisma from '@/lib/prisma';
import { requireAdmin } from './require-admin';
import { AdminChartDataResponse } from '../types/admin-chart-data-response';

export async function adminGetChartData(): Promise<AdminChartDataResponse> {
    await requireAdmin();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const enrollments = await prisma.enrollment.findMany({
        where: {
            createdAt: {
                gte: thirtyDaysAgo,
            },
            status: 'Active',
        },
        select: {
            createdAt: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    const enrollmentMap = new Map<string, number>();

    for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        const dateKey = date.toISOString().split('T')[0];
        enrollmentMap.set(dateKey, 0);
    }

    enrollments.forEach(enrollment => {
        const dateKey = enrollment.createdAt.toISOString().split('T')[0];
        const currentCount = enrollmentMap.get(dateKey) || 0;
        enrollmentMap.set(dateKey, currentCount + 1);
    });

    const chartData = Array.from(enrollmentMap.entries()).map(([date, count]) => ({
        date,
        enrollments: count,
    }));

    const totalEnrollments = enrollments.length;

    return {
        chartData,
        totalEnrollments,
    };
}
