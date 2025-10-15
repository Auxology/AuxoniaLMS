import { useConstructUrl } from '@/features/shared/hooks/use-construct';
import { BookIcon } from 'lucide-react';

interface LessonVideoPlayerProps {
    videoKey: string;
    thumbnailKey: string;
}

export function LessonVideoPlayer({ videoKey, thumbnailKey }: LessonVideoPlayerProps) {
    const thumbnailUrl = useConstructUrl(thumbnailKey);
    const videoUrl = useConstructUrl(videoKey);

    if (!videoKey) {
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <BookIcon className="size-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No video available</p>
        </div>;
    }

    return (
        <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
            <video controls className="w-full h-full object-cover" poster={thumbnailUrl}>
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/webm" />
                <source src={videoUrl} type="video/ogg" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
