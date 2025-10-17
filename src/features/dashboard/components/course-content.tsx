'use client';

import { Button } from '@/components/ui/button';
import { LessonContentType } from '../types/lesson-content-response';
import { CheckCircleIcon, SmileIcon } from 'lucide-react';
import { LessonDescription } from './lesson-description';
import { LessonVideoPlayer } from './lesson-video-player';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { tryCatch } from '@/features/shared/hooks/try-catch';
import { markLessonComplete } from '../actions/mark-lesson-complete';
import { Spinner } from '@/components/ui/spinner';

interface CourseContentProps {
    data: LessonContentType;
}

export function CourseContent({ data }: CourseContentProps) {
    const [pending, startTransition] = useTransition();

    function onSubmit() {
        startTransition(async () => {
            const { data: result, error } = await tryCatch(
                markLessonComplete(data.id, data.chapter.course.slug)
            );

            if (error) {
                toast.error(error.message);
                return;
            }

            if (result.status === 'success') {
                toast.success(result.message);
            } else if (result.status === 'error') {
                toast.error(result.message);
            }
        });
    }

    return (
        <div className="flex flex-col h-full bg-background pl-6">
            <LessonVideoPlayer
                videoKey={data.videoKey ?? ''}
                thumbnailKey={data.thumbnailKey ?? ''}
            />

            <div className="py-4 border-b">
                {data.lessonProgresses.length > 0 ? (
                    <Button
                        variant="outline"
                        className="bg-green-500/10 text-green-500 hover:text-green-600"
                    >
                        <SmileIcon className="size-4 mr-2 text-green-500" />
                        Completed
                    </Button>
                ) : (
                    <Button onClick={onSubmit} disabled={pending} variant="outline">
                        {pending ? (
                            <Spinner />
                        ) : (
                            <>
                                <CheckCircleIcon className="size-4 mr-2 text-green-500" />
                                Mark as Complete
                            </>
                        )}
                    </Button>
                )}
            </div>

            <div className="space-y-3 pt-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">{data.title}</h1>
                {data.description && <LessonDescription json={JSON.parse(data.description)} />}
            </div>
        </div>
    );
}
