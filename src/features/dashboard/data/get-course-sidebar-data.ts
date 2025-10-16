import 'server-only';

import { requireUser } from '@/features/payment/data/require-user';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { CourseSidebarData } from '../types/course-sidebar-response';

export async function getCourseSidebarData(slug: string): Promise<CourseSidebarData> {
    const session = await requireUser();

    const course = await prisma.course.findUnique({
        where: {
            slug: slug,
        },
        select: {
            id: true,
            title: true,
            fileKey: true,
            duration: true,
            level: true,
            category: true,
            slug: true,
            chapters: {
                orderBy: {
                    position: 'asc',
                },
                select: {
                    id: true,
                    title: true,
                    position: true,
                    lessons: {
                        orderBy: {
                            position: 'asc',
                        },
                        select: {
                            id: true,
                            title: true,
                            position: true,
                            description: true,
                            lessonProgresses: {
                                where: {
                                    userId: session.user.id,
                                },
                                select: {
                                    id: true,
                                    completed: true,
                                    lessonId: true,
                                }
                            }
                        },
                    },
                },
            },
        },
    });

    if (!course) return notFound();

    const enrolled = await prisma.enrollment.findFirst({
        where: {
            userId: session.user.id,
            courseId: course.id,
        },
    });

    if (!enrolled || enrolled.status !== 'Active') {
        return notFound();
    }

    return course;
}
