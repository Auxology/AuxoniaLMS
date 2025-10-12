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
import { chapterSchema, ChapterSchemaType } from '../../types/new-chapter-modal-schema';
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
import { CreateChapter } from '../../actions/create-chapter';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export default function NewChapterModal({ courseId }: { courseId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [pending, startTransition] = useTransition();

    const form = useForm<ChapterSchemaType>({
        resolver: zodResolver(chapterSchema),
        defaultValues: {
            name: '',
            courseId: courseId,
        },
    });

    async function onSubmit(value: ChapterSchemaType) {
        startTransition(async () => {
            const { data: result, error } = await tryCatch(CreateChapter(value));

            if (error) {
                toast.error('An unknown error occurred. Please try again.');
                return;
            }

            if (result.status === 'success') {
                toast.success(result.message);
            } else if (result.status === 'error') {
                toast.error(result.message);
            }

            form.reset();
            setIsOpen(false);
        });
    }

    function handleOpenChange(open: boolean) {
        if (!open) {
            form.reset();
        }

        setIsOpen(open);
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <PlusIcon className="size-4" /> New Chapter
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create</DialogTitle>
                    <DialogDescription>What will you name your new chapter?</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chapter Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter chapter name" {...field} />
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
