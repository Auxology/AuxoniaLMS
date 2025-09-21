import Link from 'next/link'
import HeroBadge from '../components/display-badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function HomeHeroSection() {
    return (
        <div className="py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <HeroBadge variant="outline" title="The Future of Learning" />
                <div className="mx-auto max-w-2xl mt-12 text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
                        Enjoy the modern learning experience
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
                        Auxonia is a modern learning management system designed to provide an
                        engaging and intuitive experience for both educators and learners.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/login">
                            <Button size="lg" variant="default">
                                Explore Courses
                            </Button>
                        </Link>
                        <Link href="/tos">
                            <Button size="lg" variant="link">
                                Terms of Service
                            </Button>
                        </Link>
                    </div>
                </div>
                <Image
                    alt="App screenshot"
                    src="https://tailwindui.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                    width={2432}
                    height={1442}
                    className="mt-16 rounded-md bg-foreground ring-1 shadow-2xl ring-border sm:mt-24"
                />
            </div>
        </div>
    )
}
