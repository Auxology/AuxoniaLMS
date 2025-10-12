import { GetSpecificCourse } from "../data/get-specific-course";

export type GetSpecificCourseType = {
    id: string;
    title: string;
    description: string;
    fileKey: string;
    price: number;
    duration: number;
    level: string;
    category: string;
    smallDescription: string;
    chapters: {
        id: string;
        title: string;
        lessons: {
            id: string;
            title: string;
        }[];
    }[];
}

export type PublicSpecificCourseType = Awaited<ReturnType<typeof GetSpecificCourse>>;