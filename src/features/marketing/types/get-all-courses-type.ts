import { getAllCourses } from '../data/get-all-courses';

export type GetAllCoursesType = {
    id: string;
    title: string;
    price: number;
    smallDescription: string;
    slug: string;
    fileKey: string;
    duration: number;
    level: string;
    category: string;
};

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];
