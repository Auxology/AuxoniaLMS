import { getSpecificCourse } from '../data/get-specific-course';
import { CourseHeroImage } from '../components/course-hero-image';
import { CourseDescription } from '../components/course-description';
import { Badge } from '@/components/ui/badge';
import {
    IconBook,
    IconCategory,
    IconChartBar,
    IconCheck,
    IconChevronDown,
    IconClock,
    IconPlayerPlay,
} from '@tabler/icons-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { CheckIcon } from 'lucide-react';
import { CourseEnrollmentButton } from '@/features/payment/components/course-enrollment-button';
import { checkIfUserIsEnrolled } from '@/features/payment/data/user-is-enrolled';
import { Button } from '@/components/ui/button';

export async function CourseIndividualSection({ slug }: { slug: string }) {
    const data = await getSpecificCourse(slug);
    const isEnrolled = await checkIfUserIsEnrolled(data.id);

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

                        <div className="mt-16 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-semibold tracking-tight">
                                    Course Content
                                </h2>
                                <div>
                                    {data.chapters.length} chapters |{' '}
                                    {data.chapters.reduce(
                                        (acc, chapter) => acc + chapter.lessons.length,
                                        0
                                    )}{' '}
                                    lessons
                                </div>
                            </div>
                            <div className="space-y-4">
                                {data.chapters.map((chapter, index) => (
                                    <Collapsible key={chapter.id} defaultOpen={index === 0}>
                                        <Card className="p-0 overflow-hidden border-2 transition-all duration-200 hover:shadow-md gap-0">
                                            <CollapsibleTrigger asChild>
                                                <div>
                                                    <CardContent className="p-6 hover:bg-muted/50 transition-colors">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                <p className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                                                                    {index + 1}
                                                                </p>
                                                                <div>
                                                                    <h3 className="text-xl font-semibold text-left">
                                                                        {chapter.title}
                                                                    </h3>
                                                                    <p className="text-sm text-muted-foreground mt-1 text-left">
                                                                        {chapter.lessons.length}{' '}
                                                                        lesson(s)
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <IconChevronDown className="size-5 text-muted-foreground" />
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </div>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <div className="border-t bg-muted/20">
                                                    <div className="p-6 pt-4 space-y-3">
                                                        {chapter.lessons.map(lesson => (
                                                            <div
                                                                className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent transition-colors group"
                                                                key={lesson.id}
                                                            >
                                                                <div className="flex size-8 items-center justify-center rounded-full bg-background border-2 border-primary/20">
                                                                    <IconPlayerPlay className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-medium">
                                                                        {lesson.title}
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground mt-1">
                                                                        Lesson {lesson.position + 1}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CollapsibleContent>
                                        </Card>
                                    </Collapsible>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="order-2 lg:col-span-1">
                        <div className="sticky top-20">
                            <Card className="py-0">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-lg font-medium">Price:</span>
                                        <span className="text-2xl font-bold text-primary">
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(data.price)}
                                        </span>
                                    </div>
                                    <div className="mb-6 space-y-3 rounded-lg bg-muted p-4">
                                        <h4 className="font-medium">What you will get:</h4>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <IconClock className="size-4" />
                                                </div>
                                                <p className="text-sm font-medium">
                                                    Course Duration
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {data.duration} hours
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <IconChartBar className="size-4" />
                                                </div>
                                                <p className="text-sm font-medium">
                                                    Course Difficulty
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {data.level}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <IconCategory className="size-4" />
                                                </div>
                                                <p className="text-sm font-medium">
                                                    Course Category
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {data.category}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <IconBook className="size-4" />
                                                </div>
                                                <p className="text-sm font-medium">Total Lessons</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {data.chapters.reduce(
                                                        (acc, chapter) =>
                                                            acc + chapter.lessons.length,
                                                        0
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6 space-y-3">
                                        <h4>This course includes:</h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2 text-sm">
                                                <div className="rounded-full p-1 bg-green-500/10 text-green-500">
                                                    <IconCheck className="size-4" />
                                                </div>
                                                <span>Full lifetime access</span>
                                            </li>
                                            <li className="flex items-center gap-2 text-sm">
                                                <div className="rounded-full p-1 bg-green-500/10 text-green-500">
                                                    <CheckIcon className="size-4" />
                                                </div>
                                                <span>Access on mobile and desktop</span>
                                            </li>
                                            <li className="flex items-center gap-2 text-sm">
                                                <div className="rounded-full p-1 bg-green-500/10 text-green-500">
                                                    <CheckIcon className="size-4" />
                                                </div>
                                                <span>Certificate of completion</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {isEnrolled ? (
                                        <Button>View Course</Button>
                                    ) : (
                                        <CourseEnrollmentButton courseId={data.id} />
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
