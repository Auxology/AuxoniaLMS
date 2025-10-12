import { HeroHeader } from '@/features/marketing/elements/marketing-header';
import { CoursesSection } from '@/features/marketing/sections/courses-section';

export default function PublishCoursesPage() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <CoursesSection />
            </main>
        </>
    );
}
