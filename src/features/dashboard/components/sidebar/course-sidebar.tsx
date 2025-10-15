import { ChevronDown, PlayIcon } from 'lucide-react';
import { getCourseSidebarData } from '../../data/get-course-sidebar-data';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { CourseSidebarLessonItem } from './course-sidebar-lesson-item';

interface CourseSidebarProps {
    slug: string;
}

export async function CourseSidebar({ slug }: CourseSidebarProps) {
    const course = await getCourseSidebarData(slug);

    return (
        <div className="flex flex-col h-full">
            <div className="pb-4 pr-2 sm:pr-4 border-b border-border">
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                    <div className="size-8 sm:size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <PlayIcon className="size-4 sm:size-5 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h1 className="font-semibold text-sm sm:text-base leading-tight truncate">
                            {course.title}
                        </h1>
                        <p className="text-xs text-muted-foreground truncate">{course.category}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground ">Progress</span>
                        <span className="font-medium">0%</span>
                    </div>

                    <Progress value={55} className="h-1.5" />
                    <p className="text-xs text-muted-foreground">55% completed</p>
                </div>
            </div>

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
                                />
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
        </div>
    );
}
