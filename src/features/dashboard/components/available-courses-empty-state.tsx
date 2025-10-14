'use client';

import { GraduationCapIcon, RefreshCwIcon } from 'lucide-react';

import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Button } from '@/components/ui/button';

export function AvailableCoursesEmptyState() {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <Empty className="mt-4 border border-dashed">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <GraduationCapIcon />
                </EmptyMedia>
                <EmptyTitle>No Available Courses</EmptyTitle>
                <EmptyDescription>
                    There are currently no new courses available for enrollment. Check back later
                    for new course releases or refresh to see if any courses have been added.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button onClick={handleRefresh} variant="outline">
                    <RefreshCwIcon className="size-4 mr-2" />
                    Refresh Page
                </Button>
            </EmptyContent>
        </Empty>
    );
}
