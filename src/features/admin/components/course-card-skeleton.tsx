import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CourseCardSkeleton() {
    return (
        <Card className="group relative py-0 gap-0">
            {/* Image skeleton */}
            <Skeleton className="w-full aspect-video rounded-t-lg" />

            {/* Menu button skeleton */}
            <div className="absolute top-2 right-2 z-10">
                <Skeleton className="size-8 rounded-md" />
            </div>

            <CardContent className="p-4">
                {/* Title skeleton */}
                <Skeleton className="h-6 w-3/4 mb-2" />

                {/* Description skeleton */}
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-4" />

                {/* Stats skeleton */}
                <div className="flex items-center gap-x-5 mb-4">
                    <div className="flex items-center gap-x-2">
                        <Skeleton className="size-6 rounded-md" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Skeleton className="size-6 rounded-md" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                </div>

                {/* Button skeleton */}
                <Skeleton className="h-10 w-full rounded-md" />
            </CardContent>
        </Card>
    );
}
