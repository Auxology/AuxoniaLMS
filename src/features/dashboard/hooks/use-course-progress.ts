'use client';

import { useMemo } from 'react';
import { CourseSidebarData } from '../types/course-sidebar-response';
import { CourseProgressResult } from '../types/course-progress-result';

interface UseCourseProgressProps {
    courseData: CourseSidebarData;
}

export function useCourseProgress({ courseData }: UseCourseProgressProps): CourseProgressResult {
    return useMemo(() => {
        let totalLessons = 0;
        let completedLessons = 0;

        courseData.chapters.forEach(chapter => {
            chapter.lessons.forEach(lesson => {
                totalLessons++;

                const isCompleted = lesson.lessonProgresses?.some(
                    progress => progress.lessonId === lesson.id && progress.completed
                );

                if (isCompleted) {
                    completedLessons++;
                }
            });
        });

        const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

        return {
            totalLessons,
            completedLessons,
            progress,
        };
    }, [courseData]);
}
