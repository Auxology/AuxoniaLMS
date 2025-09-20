import { HeroHeader } from '@/features/marketing/elements/marketing-header'
import HomeHeroSection from '@/features/marketing/sections/home-hero'

export default function LandingPage() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <HomeHeroSection />
            </main>
        </>
    )
}
