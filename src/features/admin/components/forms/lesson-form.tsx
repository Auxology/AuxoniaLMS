'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { AdminLessonType } from '../../types/admin-get-lesson-type';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { lessonSchema, LessonSchemaType } from '../../types/new-lesson-modal-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { RichTextEditor } from '../editor/editor';
import { Uploader } from '../file-uploader/uploader';
import { tryCatch } from '@/features/shared/hooks/try-catch';
import { toast } from 'sonner';
import { updateLesson } from '../../actions/update-lesson';
import { useTransition } from 'react';
import { Spinner } from '@/components/ui/spinner';

interface LessonFormProps {
    data: AdminLessonType;
    chapterId: string;
    courseId: string;
}

export function LessonForm({ data, chapterId, courseId }: LessonFormProps) {
    const [pending, startTransition] = useTransition();

    const form = useForm<LessonSchemaType>({
        defaultValues: {
            chapterId: chapterId,
            courseId: courseId,
            name: data.title,
            description: data.description ?? undefined,
            videoKey: data.videoKey ?? undefined,
            thumbnailKey: data.thumbnailKey ?? undefined,
        },
        resolver: zodResolver(lessonSchema),
    });

    const handleSubmit = async (values: LessonSchemaType) => {
        startTransition(async () => {
            const { data: result, error } = await tryCatch(updateLesson(values, data.id));

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
    };

    return (
        <div>
            <Link
                className={buttonVariants({ variant: 'outline', className: 'mb-6' })}
                href={`/admin/courses/${courseId}/edit`}
            >
                <ArrowLeftIcon className="size-4" />
                <span>Go Back</span>
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle>Lesson Information</CardTitle>
                    <CardDescription>
                        Configure the video and description for your lesson.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lesson Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter lesson name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lesson Description</FormLabel>
                                        <FormControl>
                                            <RichTextEditor field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="thumbnailKey"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Thumbnail Key</FormLabel>
                                        <FormControl>
                                            <Uploader
                                                onChange={field.onChange}
                                                value={field.value}
                                                fileTypeAccepted="image"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="videoKey"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Video Key</FormLabel>
                                        <FormControl>
                                            <Uploader
                                                onChange={field.onChange}
                                                value={field.value}
                                                fileTypeAccepted="video"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button disabled={pending} type="submit">
                                {pending ? (
                                    <>
                                        <Spinner />
                                    </>
                                ) : (
                                    'Save Lesson'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
