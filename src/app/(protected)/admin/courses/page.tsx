import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CoursesPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your Courses</h1>

                <Link href="/admin/courses/create">
                    <Button>Create Course</Button>
                </Link>
            </div>

            <div>
                <h1>Here you will all of the courses</h1>
            </div>
        </>
    )
}
