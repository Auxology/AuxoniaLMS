'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CourseForm } from '@/features/admin/components/forms/course-form';

export default function CourseCreationPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/courses"
                    className={buttonVariants({ variant: 'outline', size: 'icon' })}
                >
                    <ArrowLeft />
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Create Course</h1>
            </div>

            <CourseForm />
        </div>
    );
}
