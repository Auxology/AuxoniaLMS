'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useConstructUrl } from '@/features/shared/hooks/use-construct';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { EnrolledCourseType } from '../types/enrolled-courses-response';
import { useCourseProgress } from '../hooks/use-course-progress';
import { Progress } from '@/components/ui/progress';

interface CourseProgressCardProps {
    data: EnrolledCourseType;
}

export function CourseProgressCard({ data }: CourseProgressCardProps) {
    const url = useConstructUrl(data.course.fileKey);
    const { totalLessons, completedLessons, progress } = useCourseProgress({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        courseData: data.course as any,
    });

    return (
        <Card className="group relative py-0 gap-0">
            <Badge className="absolute top-2 right-2 z-10">{data.course.level}</Badge>
            {url && (
                <Image
                    src={url}
                    alt="Thumbnail"
                    width={600}
                    height={400}
                    className="w-full rounded-t-lg aspect-video h-full object-cover"
                />
            )}

            <CardContent className="p-4">
                <Link
                    className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
                    href={`/dashboard/${data.course.slug}`}
                >
                    {data.course.title}
                </Link>
                <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
                    {data.course.smallDescription}
                </p>

                <div className="space-y-4 mt-4">
                    <div className="flex justify-between mb-1 text-sm">
                        <p>Progress:</p>
                        <p className="font-medium">{progress}%</p>
                    </div>
                    <Progress value={progress} className="h-1.5" />

                    <p className="text-xs text-muted-foreground mt-1">
                        {completedLessons} / {totalLessons} lessons completed
                    </p>
                </div>

                <Link
                    className={buttonVariants({
                        variant: 'outline',
                        size: 'default',
                        className: 'w-full mt-4',
                    })}
                    href={`/dashboard/${data.course.slug}`}
                >
                    View Course <ArrowRightIcon className="size-4" />
                </Link>
            </CardContent>
        </Card>
    );
}
