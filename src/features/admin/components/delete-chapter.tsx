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
import { tryCatch } from '@/features/shared/hooks/try-catch';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { deleteChapter } from '../actions/delete-chapter';
import { Spinner } from '@/components/ui/spinner';

interface DeleteChapterProps {
    courseId: string;
    chapterId: string;
}

export function DeleteChapter({ courseId, chapterId }: DeleteChapterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [pending, startTransition] = useTransition();

    async function onDelete() {
        startTransition(async () => {
            const { data: result, error } = await tryCatch(deleteChapter({ courseId, chapterId }));

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
                <Button variant="destructive" size="icon">
                    <Trash2Icon className="size-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this chapter?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will delete the chapter and all of its
                        lessons and content.
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
