import { getEnrolledCourses } from '../data/get-enrolled-courses';

export type EnrolledCoursesResponse = {
    course: {
        id: string;
        title: string;
        smallDescription: string;
        duration: number;
        level: string;
        slug: string;
        fileKey: string;
        category: string;
        chapters: {
            id: string;
            lessons: {
                id: string;
                lessonProgresses: {
                    id: string;
                    completed: boolean;
                    lessonId: string;
                }[] | null;
            }[];
        }[];
    };
};

export type EnrolledCourseType = Awaited<ReturnType<typeof getEnrolledCourses>>[0];
