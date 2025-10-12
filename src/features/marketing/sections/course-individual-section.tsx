import { GetSpecificCourse } from '../data/get-specific-course';
import { CourseHeroImage } from '../components/course-hero-image';
import { CourseDescription } from '../components/course-description';
import { Badge } from '@/components/ui/badge';
import { IconCategory, IconChartBar, IconClock } from '@tabler/icons-react';
import { Separator } from '@/components/ui/separator';

export async function CourseIndividualSection({ slug }: { slug: string }) {
    const data = await GetSpecificCourse(slug);

    return (
        <div className="py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-5">
                    <div className="order-1 lg:col-span-2">
                        <CourseHeroImage fileKey={data.fileKey} title={data.title} />
                        <div className="mt-8 space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold tracking-tight ">{data.title}</h1>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {data.smallDescription}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Badge className="flex items-center gap-1 px-3 py-1">
                                    <IconChartBar className="size-4" />
                                    {data.level}
                                </Badge>
                                <Badge className="flex items-center gap-1 px-3 py-1">
                                    <IconCategory className="size-4" />
                                    {data.category}
                                </Badge>
                                <Badge className="flex items-center gap-1 px-3 py-1">
                                    <IconClock className="size-4" />
                                    {data.duration} hours
                                </Badge>
                            </div>
                            <Separator className="my-8" />
                            <div className="space-y-6">
                                <h2 className="text-3xl font-semibold tracking-tight">
                                    Course Description
                                </h2>
                                <CourseDescription json={JSON.parse(data.description)} />
                            </div>
                        </div>
                        <div className="mt-12 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-semibold tracking-tight">
                                    Course Content
                                </h2>
                                <div>
                                    {data.chapters.length} chapters | {data.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)} lessons
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
