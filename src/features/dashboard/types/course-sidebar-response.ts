export type CourseSidebarData = {
    id: string;
    title: string;
    fileKey: string;
    duration: number;
    level: string;
    category: string;
    slug: string;
    chapters: {
        id: string;
        title: string;
        position: number;
        lessons: {
            id: string;
            title: string;
            position: number;
            description: string | null;
            lessonProgresses: {
                id: string;
                completed: boolean;
                lessonId: string;
            }[] | null;
        }[];
    }[];
};
