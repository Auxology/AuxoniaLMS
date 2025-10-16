'use client';

import { PlayIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useCourseProgress } from '../../hooks/use-course-progress';
import { CourseSidebarData } from '../../types/course-sidebar-response';

interface CourseSidebarProgressProps {
    course: CourseSidebarData;
}

export function CourseSidebarProgress({ course }: CourseSidebarProgressProps) {
    const { totalLessons, completedLessons, progress } = useCourseProgress({ courseData: course });

    return (
        <div className="pb-4 pr-2 sm:pr-4 border-b border-border">
            <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <div className="size-8 sm:size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <PlayIcon className="size-4 sm:size-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                    <h1 className="font-semibold text-sm sm:text-base leading-tight truncate">
                        {course.title}
                    </h1>
                    <p className="text-xs text-muted-foreground truncate">
                        {completedLessons} / {totalLessons} lessons completed
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                </div>

                <Progress value={progress} className="h-1.5" />
                <p className="text-xs text-muted-foreground">{Math.round(progress)}% completed</p>
            </div>
        </div>
    );
}
