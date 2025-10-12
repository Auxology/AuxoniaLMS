'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { tryCatch } from '@/hooks/try-catch';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { DeleteLessonAction } from '../actions/delete-lesson';
import { Spinner } from '@/components/ui/spinner';

interface DeleteLessonProps {
    courseId: string;
    chapterId: string;
    lessonId: string;
}

export default function DeleteLesson({ courseId, chapterId, lessonId }: DeleteLessonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [pending, startTransition] = useTransition();

    async function onDelete() {
        startTransition(async () => {
            const { data: result, error } = await tryCatch(
                DeleteLessonAction({ courseId, chapterId, lessonId })
            );

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
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Trash2Icon className="size-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this lesson?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will delete the lesson and all of its
                        content.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} disabled={pending}>
                        {pending ? (
                            <>
                                <Spinner />
                            </>
                        ) : (
                            'Delete'
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
