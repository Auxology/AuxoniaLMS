import { HeroHeader } from '@/features/marketing/elements/marketing-header';
import { HomeFeaturesSection } from '@/features/marketing/sections/home-features';
import { HomeHeroSection } from '@/features/marketing/sections/home-hero';

export default function LandingPage() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <HomeHeroSection />
                <HomeFeaturesSection />
            </main>
        </>
    );
}
