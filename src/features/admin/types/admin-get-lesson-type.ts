import { AdminGetLesson } from '../data/admin-get-lesson';

export type AdminGetLessonType = {
    id: string;
    title: string;
    description: string | null;
    thumbnailKey: string | null;
    videoKey: string | null;
    position: number;
};

export type AdminLessonType = Awaited<ReturnType<typeof AdminGetLesson>>;
