import { Card, CardContent } from '@/components/ui/card';
import { PublicCourseType } from '../types/get-all-courses-type';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useConstructUrl } from '@/features/shared/hooks/use-construct';
import Link from 'next/link';
import { ArrowRightIcon, SchoolIcon, TimerIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

interface PublicCourseCardProps {
    data: PublicCourseType;
}

export function PublicCourseCard({ data }: PublicCourseCardProps) {
    const url = useConstructUrl(data.fileKey);

    return (
        <Card className="group relative py-0 gap-0">
            <Badge className="absolute top-2 right-2 z-10">{data.level}</Badge>
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
                    href={`/courses/${data.slug}`}
                >
                    {data.title}
                </Link>
                <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
                    {data.smallDescription}
                </p>
                <div className="mt-4 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-2">
                        <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
                        <p className="text-sm text-muted-foreground">{data.duration} hours</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <SchoolIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
                        <p className="text-sm text-muted-foreground">{data.level}</p>
                    </div>
                </div>
                <Link
                    className={buttonVariants({
                        variant: 'outline',
                        size: 'default',
                        className: 'w-full mt-4',
                    })}
                    href={`/courses/${data.slug}`}
                >
                    View Course <ArrowRightIcon className="size-4" />
                </Link>
            </CardContent>
        </Card>
    );
}
