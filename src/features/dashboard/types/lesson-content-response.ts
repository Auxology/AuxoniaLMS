import { getLessonContent } from '../data/get-lesson-content';

export type LessonContentData = {
    id: string;
    title: string;
    description: string | null;
    thumbnailKey: string | null;
    videoKey: string | null;
    position: number;
    lessonProgresses: {
        id: string;
        completed: boolean;
    }[];
    chapter: {
        courseId: string;
        course: {
            slug: string;
        };
    };
};

export type LessonContentType = Awaited<ReturnType<typeof getLessonContent>>;
