'use server';

import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { GetSpecificCourseType } from '../types/get-specific-course-type';

export async function getSpecificCourse(slug: string): Promise<GetSpecificCourseType> {
    const course = await prisma.course.findUnique({
        where: {
            slug: slug,
        },
        select: {
            id: true,
            title: true,
            description: true,
            fileKey: true,
            price: true,
            duration: true,
            level: true,
            category: true,
            smallDescription: true,
            chapters: {
                select: {
                    id: true,
                    title: true,
                    lessons: {
                        select: {
                            id: true,
                            title: true,
                            position: true,
                        },
                        orderBy: {
                            position: 'asc',
                        },
                    },
                },
                orderBy: {
                    position: 'asc',
                },
            },
        },
    });

    if (!course) return notFound();

    return course;
}
