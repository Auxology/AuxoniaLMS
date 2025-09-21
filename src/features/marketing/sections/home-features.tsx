import { BookOpenIcon, GamepadIcon, ScatterChartIcon, UsersIcon } from 'lucide-react'
import { featureProps } from '../types/feature-props'

const features: featureProps[] = [
    {
        name: 'Comprehensive Courses',
        description:
            'Access a wide range of courses across various subjects, designed by industry experts to enhance your skills and knowledge.',
        icon: BookOpenIcon,
    },
    {
        name: 'Interactive Learning',
        description:
            'Engage with interactive content, quizzes, and assignments that make learning fun and effective.',
        icon: GamepadIcon,
    },
    {
        name: 'Progress Tracking',
        description: 'Monitor your learning journey with detailed progress reports and analytics.',
        icon: ScatterChartIcon,
    },
    {
        name: 'Community Support',
        description:
            'Connect with a vibrant community of learners and educators for collaboration and support.',
        icon: UsersIcon,
    },
]

export default function HomeFeaturesSection() {
    return (
        <div className="py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base/7 font-semibold text-primary">Learn Faster</h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl lg:text-balance">
                        Everything you need to boost your knowledge
                    </p>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        Our platform offers a variety of features designed to enhance your learning
                        experience and help you achieve your educational goals.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map(feature => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base/7 font-semibold text-foreground">
                                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                                        <feature.icon
                                            aria-hidden="true"
                                            className="size-6 text-white"
                                        />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base/7 text-muted-foreground/80">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
