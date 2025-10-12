import { BookOpenIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';

export function CoursesEmptyState() {
    return (
        <Empty className="border border-dashed">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <BookOpenIcon />
                </EmptyMedia>
                <EmptyTitle>No Courses Yet</EmptyTitle>
                <EmptyDescription>
                    You haven&apos;t created any courses yet. Get started by creating your first
                    course.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button asChild>
                    <Link href="/admin/courses/create">
                        <PlusIcon className="size-4 mr-2" />
                        Create Your First Course
                    </Link>
                </Button>
            </EmptyContent>
        </Empty>
    );
}
