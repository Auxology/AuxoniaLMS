'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { lessonSchema, LessonSchemaType } from '../../types/new-lesson-modal-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { tryCatch } from '@/hooks/try-catch';
import { CreateLesson } from '../../actions/create-lesson';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export default function NewLessonModal({
    courseId,
    chapterId,
}: {
    courseId: string;
    chapterId: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [pending, startTransition] = useTransition();

    const form = useForm<LessonSchemaType>({
        resolver: zodResolver(lessonSchema),
        defaultValues: {
            name: '',
            courseId: courseId,
            chapterId: chapterId,
            description: undefined,
            videoKey: undefined,
            thumbnailKey: undefined,
        },
    });

    async function onSubmit(value: LessonSchemaType) {
        startTransition(async () => {
            const { data: result, error } = await tryCatch(CreateLesson(value));

            if (error) {
                toast.error('An unknown error occurred. Please try again.');
                return;
            }

            if (result.status === 'success') {
                toast.success(result.message);
            } else if (result.status === 'error') {
                toast.error(result.message);
            }

            form.reset({
                name: '',
                courseId: courseId,
                chapterId: chapterId,
                description: undefined,
                videoKey: undefined,
                thumbnailKey: undefined,
            });
            setIsOpen(false);
        });
    }

    function handleOpenChange(open: boolean) {
        if (!open) {
            form.reset({
                name: '',
                courseId: courseId,
                chapterId: chapterId,
                description: undefined,
                videoKey: undefined,
                thumbnailKey: undefined,
            });
        }

        setIsOpen(open);
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-center">
                    <PlusIcon className="size-4" /> New Lesson
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New Lesson</DialogTitle>
                    <DialogDescription>Fill in the details for your new lesson.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
                        <DialogFooter>
                            <Button disabled={pending} type="submit">
                                {pending ? (
                                    <>
                                        <Spinner />
                                    </>
                                ) : (
                                    'Save Change'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
