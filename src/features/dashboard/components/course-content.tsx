import { Button } from '@/components/ui/button';
import { LessonContentType } from '../types/lesson-content-response';
import { CheckCircleIcon } from 'lucide-react';
import { LessonDescription } from './lesson-description';
import { LessonVideoPlayer } from './lesson-video-player';

interface CourseContentProps {
    data: LessonContentType;
}

export function CourseContent({ data }: CourseContentProps) {
    return (
        <div className="flex flex-col h-full bg-background pl-6">
            <LessonVideoPlayer
                videoKey={data.videoKey ?? ''}
                thumbnailKey={data.thumbnailKey ?? ''}
            />

            <div className="py-4 border-b">
                <Button variant="outline">
                    <CheckCircleIcon className="size-4 mr-2 text-green-500" />
                    Mark as Complete
                </Button>
            </div>

            <div className="space-y-3 pt-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">{data.title}</h1>
                <p>
                    {data.description && <LessonDescription json={JSON.parse(data.description)} />}
                </p>
            </div>
        </div>
    );
}
