export type EnrolledCoursesResponse = {
    Course: {
        id: string;
        title: string;
        smallDescription: string;
        duration: number;
        level: string;
        slug: string;
        fileKey: string;
        chapters: {
            id: string;
            lessons: {
                id: string;
            }[];
        }[];
    };
};
