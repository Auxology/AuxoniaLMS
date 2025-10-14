import { getNonEnrolledCourses } from "../data/get-non-enrolled-courses";

export type NonEnrolledCoursesResponse = {
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

export type PublicCourseType = Awaited<ReturnType<typeof getNonEnrolledCourses>>[0];
