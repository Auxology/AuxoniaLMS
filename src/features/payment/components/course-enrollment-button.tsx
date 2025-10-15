'use client';

import { enrollInCourse } from '@/features/payment/actions/enroll-in-course';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { tryCatch } from '@/features/shared/hooks/try-catch';

export function CourseEnrollmentButton({ courseId }: { courseId: string }) {
    const [pending, startTransition] = useTransition();

    const handleEnroll = () => {
        startTransition(async () => {
            const { data, error } = await tryCatch(enrollInCourse(courseId));

            if (error) {
                toast.error('An unknown error occurred. Please try again.');
                return;
            }

            if (data.status === 'success') {
                toast.success('Successfully enrolled!');
            } else if (data.status === 'error') {
                toast.error(data.message);
            }
        });
    };

    return (
        <Button onClick={handleEnroll} disabled={pending}>
            {pending ? <Spinner /> : 'Enroll Now'}
        </Button>
    );
}
