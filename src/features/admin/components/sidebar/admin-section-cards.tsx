import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenIcon, ListIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react';
import { adminGetStats } from '../../data/admin-get-stats';

export async function SectionCards() {
    const stats = await adminGetStats();

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardDescription>Total Registered Users</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {stats.totalUsers}
                        </CardTitle>
                    </div>
                    <UsersIcon className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <p className="text-muted-foreground">
                        All users who have successfully created an account.
                    </p>
                </CardFooter>
            </Card>

            <Card className="@container/card">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardDescription>Total Paying Customers</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {stats.totalPayingUsers}
                        </CardTitle>
                    </div>
                    <ShoppingCartIcon className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <p className="text-muted-foreground">
                        Users who have tried to complete a course purchase.
                    </p>
                </CardFooter>
            </Card>

            <Card className="@container/card">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardDescription>Total Courses</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {stats.totalCourses}
                        </CardTitle>
                    </div>
                    <BookOpenIcon className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <p className="text-muted-foreground">
                        Total number of courses that have been created on the platform.
                    </p>
                </CardFooter>
            </Card>

            <Card className="@container/card">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                        <CardDescription>Total Lessons</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {stats.totalLessons}
                        </CardTitle>
                    </div>
                    <ListIcon className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <p className="text-muted-foreground">
                        Total number of lessons that have been created on the platform.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
