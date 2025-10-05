import { AdminGetCourse } from "../data/admin-get-course";

export type AdminCourse = {
    id: string;
    title: string;
    smallDescription: string;
    duration: number;
    level: string;
    status: string;
    price: number;
    fileKey: string;
    slug: string;
};

export type ExplicitAdminCourse = AdminCourse & {
    description: string;
    category: string;
    chapters: {
        id: string;
        title: string;
        position: number;
        lessons: {
            id: string;
            title: string;
            description: string | null;
            thumbnailKey: string | null;
            videoKey: string | null;
            position: number;
        }[];
    }[];
};

export type ExplicitAdminCourseType = Awaited<
    ReturnType<typeof AdminGetCourse>
>;

export type AdminGetCoursesResult = AdminCourse[];
