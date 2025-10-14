import prisma from '@/lib/prisma';
import { GetAllCoursesType } from '../types/get-all-courses-type';

export async function getAllCourses(): Promise<GetAllCoursesType[]> {
    const data = await prisma.course.findMany({
        where: {
            status: 'Published',
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
