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
};

export type ExplicitAdminCourseType = Awaited<
    ReturnType<typeof import('../data/admin-get-course').AdminGetCourse>
>;

export type AdminGetCoursesResult = AdminCourse[];
