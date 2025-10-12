import { HeroHeader } from '@/features/marketing/elements/marketing-header';
import { CourseIndividualSection } from '@/features/marketing/sections/course-individual-section';

type Params = Promise<{ slug: string }>;

export default async function CourseIndividualPage({ params }: { params: Params }) {
    const { slug } = await params;

    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <CourseIndividualSection slug={slug} />
            </main>
        </>
    );
}
