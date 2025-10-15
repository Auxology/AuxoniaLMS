import { getLessonContent } from "../data/get-lesson-content";

export type LessonContentData = {
    id: string;
    title: string;
    description: string | null;
    thumbnailKey: string | null;
    videoKey: string | null;
    position: number;
};

export type LessonContentType = Awaited<ReturnType<typeof getLessonContent>>;