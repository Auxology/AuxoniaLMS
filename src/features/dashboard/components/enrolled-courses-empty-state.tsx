import { BookOpenIcon, SearchIcon } from 'lucide-react';
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

export function EnrolledCoursesEmptyState() {
    return (
        <Empty className="border border-dashed">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <BookOpenIcon />
                </EmptyMedia>
                <EmptyTitle>No Enrolled Courses</EmptyTitle>
                <EmptyDescription>
                    You haven&apos;t enrolled in any courses yet. Browse our available courses and
                    start your learning journey today.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button asChild>
                    <Link href="/courses">
                        <SearchIcon className="size-4 mr-2" />
                        Browse Courses
                    </Link>
                </Button>
            </EmptyContent>
        </Empty>
    );
}
