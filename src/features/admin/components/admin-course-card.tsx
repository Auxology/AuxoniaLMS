import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { AdminCourse } from '../types/admin-get-courses-type';
import { useConstructUrl } from '@/features/shared/hooks/use-construct';
import Link from 'next/link';
import { EyeIcon, MoreVerticalIcon, PencilIcon, SchoolIcon, TimerIcon, TrashIcon } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface IAppProps {
    data: AdminCourse;
}

export function AdminCourseCard({ data }: IAppProps) {
    const url = useConstructUrl(data.fileKey);

    return (
        <Card className="group relative py-0 gap-0">
            <div className="absolute top-2 right-2 z-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon">
                            <MoreVerticalIcon className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${data.slug}`}>
                                <PencilIcon className="size-4 mr-2" />
                                Edit Course
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${data.slug}`}>
                                <EyeIcon className="size-4 mr-2" />
                                Preview
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild variant="destructive">
                            <Link href={`/admin/courses/${data.id}/delete`}>
                                <TrashIcon className="size-4 mr-2" />
                                Delete
                            </Link>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Image
                src={url}
                alt="Thumbnail"
                width={600}
                height={400}
                className="w-full rounded-t-lg aspect-video h-full object-cover"
            />

            <CardContent className="p-4">
                <Link
                    href={`/admin/courses/${data.id}`}
                    className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
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
                    href={`/admin/courses/${data.id}/edit`}
                >
                    Edit Course <PencilIcon className="size-4" />
                </Link>
            </CardContent>
        </Card>
    );
}
