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

export type AdminGetCoursesResult = AdminCourse[];

