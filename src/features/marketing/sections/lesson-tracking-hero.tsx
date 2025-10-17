'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DisplayBadge } from '../components/display-badge';
import { PlayIcon, CheckIcon, BookOpenIcon, ArrowRightIcon, ClockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for demonstration
const mockCourses = [
    {
        id: '1',
        title: 'Advanced React Development',
        description: 'Master modern React patterns and best practices',
        level: 'Advanced',
        progress: 75,
        completedLessons: 15,
        totalLessons: 20,
        thumbnail: '/next.svg',
    },
    {
        id: '2',
        title: 'TypeScript Fundamentals',
        description: 'Learn TypeScript from basics to advanced concepts',
        level: 'Beginner',
        progress: 100,
        completedLessons: 12,
        totalLessons: 12,
        thumbnail: '/vercel.svg',
    },
];

const mockLessons = [
    { id: '1', title: 'Introduction to Components', completed: true, duration: '5:30' },
    { id: '2', title: 'State Management with Hooks', completed: true, duration: '8:15' },
    { id: '3', title: 'Advanced Patterns', completed: false, duration: '12:45', isActive: true },
    { id: '4', title: 'Performance Optimization', completed: false, duration: '10:20' },
    { id: '5', title: 'Testing Strategies', completed: false, duration: '7:30' },
];

export function LessonTrackingHero() {
    const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
    const [hoveredLesson, setHoveredLesson] = useState<string | null>(null);

    return (
        <div className="py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <DisplayBadge variant="outline" title="Track Your Learning Journey" />

                <div className="mx-auto max-w-4xl mt-12 text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
                        Learn with <span className="text-primary">Progress Tracking</span>
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
                        Experience modern learning with detailed progress tracking, interactive
                        lessons, and achievement milestones that keep you motivated.
                    </p>
                </div>

                {/* Interactive Course Cards */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {mockCourses.map(course => (
                        <Card
                            key={course.id}
                            className={cn(
                                'group relative transition-all duration-300 hover:shadow-xl',
                                hoveredCourse === course.id && 'shadow-xl scale-[1.02]'
                            )}
                            onMouseEnter={() => setHoveredCourse(course.id)}
                            onMouseLeave={() => setHoveredCourse(null)}
                        >
                            <div className="relative">
                                <Badge className="absolute top-3 right-3 z-10">
                                    {course.level}
                                </Badge>

                                {/* Course Thumbnail Placeholder */}
                                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                                    <BookOpenIcon className="size-16 text-primary/60" />
                                </div>

                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {course.description}
                                    </p>

                                    {/* Progress Section */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span className="font-medium">{course.progress}%</span>
                                        </div>
                                        <Progress value={course.progress} className="h-2" />
                                        <p className="text-xs text-muted-foreground">
                                            {course.completedLessons} / {course.totalLessons}{' '}
                                            lessons completed
                                        </p>
                                    </div>

                                    <Button
                                        className="w-full mt-4 group-hover:bg-primary/90 transition-colors"
                                        variant="outline"
                                    >
                                        Continue Learning
                                        <ArrowRightIcon className="size-4 ml-2" />
                                    </Button>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Interactive Lesson List */}
                <div className="mt-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold mb-4">
                            Interactive Learning Experience
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Track your progress through each lesson with visual indicators and
                            completion states
                        </p>
                    </div>

                    <Card className="max-w-2xl mx-auto">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <PlayIcon className="size-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">React Fundamentals Course</h3>
                                    <p className="text-sm text-muted-foreground">
                                        3 / 5 lessons completed
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {mockLessons.map((lesson, index) => (
                                    <div
                                        key={lesson.id}
                                        className={cn(
                                            'flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer',
                                            lesson.isActive && 'bg-primary/10 border-primary/50',
                                            hoveredLesson === lesson.id && 'bg-muted/50',
                                            lesson.completed &&
                                                'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                        )}
                                        onMouseEnter={() => setHoveredLesson(lesson.id)}
                                        onMouseLeave={() => setHoveredLesson(null)}
                                    >
                                        <div className="shrink-0">
                                            {lesson.completed ? (
                                                <div className="size-6 rounded-full border-2 bg-green-600 flex justify-center items-center">
                                                    <CheckIcon className="size-3 text-white" />
                                                </div>
                                            ) : (
                                                <div
                                                    className={cn(
                                                        'size-6 rounded-full border-2 flex justify-center items-center',
                                                        lesson.isActive
                                                            ? 'border-primary bg-primary/10'
                                                            : 'border-muted-foreground/40 bg-background'
                                                    )}
                                                >
                                                    <PlayIcon
                                                        className={cn(
                                                            'size-3',
                                                            lesson.isActive
                                                                ? 'text-primary'
                                                                : 'text-muted-foreground'
                                                        )}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={cn(
                                                    'font-medium text-sm',
                                                    lesson.completed &&
                                                        'text-green-800 dark:text-green-200',
                                                    lesson.isActive && 'text-primary font-semibold'
                                                )}
                                            >
                                                {index + 1}. {lesson.title}
                                            </p>
                                            {lesson.completed && (
                                                <p className="text-xs text-green-700 dark:text-green-300 font-medium">
                                                    Completed
                                                </p>
                                            )}
                                            {lesson.isActive && (
                                                <p className="text-xs text-primary font-medium">
                                                    Currently Watching
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <ClockIcon className="size-3" />
                                            {lesson.duration}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Overall Progress */}
                            <div className="mt-6 pt-4 border-t">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground">Course Progress</span>
                                    <span className="font-medium">60%</span>
                                </div>
                                <Progress value={60} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/login">
                            <Button size="lg" className="w-full sm:w-auto">
                                Start Learning Now
                                <ArrowRightIcon className="size-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/courses">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                Browse Courses
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
