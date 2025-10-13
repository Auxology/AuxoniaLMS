'use client';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { tryCatch } from '@/hooks/try-catch';
import Link from 'next/link';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { deleteCourse } from '@/features/admin/actions/delete-course';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export default function DeleteCoursePage() {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const { courseId } = useParams<{ courseId: string }>();

    async function onDelete() {
        startTransition(async () => {
            const { data: result, error } = await tryCatch(deleteCourse(courseId));

            if (error) {
                toast.error('An unknown error occurred. Please try again.');
                return;
            }

            if (result.status === 'success') {
                toast.success(result.message);
                router.push('/admin/courses');
            } else if (result.status === 'error') {
                toast.error(result.message);
            }
        });
    }

    return (
        <div className="max-w-xl mx-auto w-full">
            <Card className="mt-32">
                <CardHeader>
                    <CardTitle>Are you sure you want to delete this course?</CardTitle>
                    <CardDescription>
                        This action cannot be undone. This will delete the course and all of its
                        chapters and lessons and content.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-6">
                    <Link
                        className={buttonVariants({ variant: 'outline' })}
                        href={`/admin/courses`}
                    >
                        Cancel
                    </Link>
                    <Button disabled={pending} variant="destructive" onClick={onDelete}>
                        {pending ? (
                            <>
                                <Spinner />
                            </>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
