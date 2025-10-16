import { ChevronDown } from 'lucide-react';
import { getCourseSidebarData } from '../../data/get-course-sidebar-data';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { CourseSidebarLessonItem } from './course-sidebar-lesson-item';
import { CourseSidebarProgress } from './course-sidebar-progress';

interface CourseSidebarProps {
    slug: string;
}

export async function CourseSidebar({ slug }: CourseSidebarProps) {
    const course = await getCourseSidebarData(slug);

    return (
        <div className="flex flex-col h-full">
            <CourseSidebarProgress course={course} />

            <div className="py-4 pr-2 sm:pr-4 space-y-2 sm:space-y-3">
                {course.chapters.map((chapter, index) => (
                    <Collapsible key={chapter.id} defaultOpen={index === 0}>
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full p-2 sm:p-3 h-auto flex items-center gap-2"
                            >
                                <div className="shrink-0">
                                    <ChevronDown className="size-3 sm:size-4 text-primary" />
                                </div>
                                <div className="flex-1 flex flex-col min-w-0 text-left">
                                    <p className="font-semibold text-xs sm:text-sm truncate">
                                        {chapter.position}: {chapter.title}
                                    </p>
                                    <p className="text-[9px] sm:text-[10px] text-muted-foreground truncate">
                                        {chapter.lessons.length} lessons
                                    </p>
                                </div>
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 sm:mt-3 pl-4 sm:pl-6 border-l-2 space-y-2 sm:space-y-3">
                            {chapter.lessons.map(lesson => (
                                <CourseSidebarLessonItem
                                    key={lesson.id}
                                    lesson={lesson}
                                    slug={slug}
                                    completed={
                                        lesson.lessonProgresses?.find(
                                            progress => progress.lessonId === lesson.id
                                        )?.completed || false
                                    }
                                />
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
        </div>
    );
}
