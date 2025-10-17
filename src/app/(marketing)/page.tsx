import { HeroHeader } from '@/features/marketing/elements/marketing-header';
import { HomeFeaturesSection } from '@/features/marketing/sections/home-features';
import { LessonTrackingHero } from '@/features/marketing/sections/lesson-tracking-hero';

export default function LandingPage() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <LessonTrackingHero />
                <HomeFeaturesSection />
            </main>
        </>
    );
}
