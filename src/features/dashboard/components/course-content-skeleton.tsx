import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function CourseContentSkeleton() {
    return (
        <div className="flex flex-col h-full bg-background pl-6">
            {/* Video Player Skeleton */}
            <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
                <Skeleton className="w-full h-full" />
            </div>

            {/* Button Skeleton */}
            <div className="py-4 border-b">
                <Skeleton className="h-10 w-40" />
            </div>

            {/* Content Skeleton */}
            <div className="space-y-3 pt-3">
                {/* Title Skeleton */}
                <Skeleton className="h-8 w-3/4" />

                {/* Description Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        </div>
    );
}
