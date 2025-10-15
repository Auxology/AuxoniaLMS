'use client';

import Link from 'next/link';
import {
    Menu,
    X,
    HomeIcon,
    BookOpenIcon,
    Layers2Icon,
    SettingsIcon,
    UsersIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';
import { UserDashboard } from '../components/user-dashboard';
import type { LucideIcon } from 'lucide-react';
import { ThemeTrigger } from '@/components/theme-trigger';

interface NavigationItem {
    name: string;
    href: string;
    icon?: LucideIcon;
}

const getMenuItems = (isAdmin: boolean): NavigationItem[] => {
    const baseItems: NavigationItem[] = [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'Courses', href: '/courses', icon: BookOpenIcon },
        { name: 'Dashboard', href: '/dashboard', icon: Layers2Icon },
    ];

    if (isAdmin) {
        return [
            ...baseItems,
            { name: 'Admin Dashboard', href: '/admin', icon: SettingsIcon },
            { name: 'Manage Courses', href: '/admin/courses', icon: UsersIcon },
        ];
    }

    return baseItems;
};

export const HeroHeader: React.FC = () => {
    const [menuState, setMenuState] = React.useState<boolean>(false);
    const [isScrolled, setIsScrolled] = React.useState<boolean>(false);
    const { data: session, isPending } = authClient.useSession();

    const isAdmin = session?.user?.role === 'admin';
    const menuItems = getMenuItems(isAdmin);

    React.useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = (): void => {
        setMenuState(prev => !prev);
    };
    return (
        <header>
            <nav data-state={menuState && 'active'} className="fixed z-20 w-full px-2">
                <div
                    className={cn(
                        'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
                        isScrolled &&
                            'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
                    )}
                >
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2"
                            >
                                <span className="text-xl font-semibold">AuxoniaLMS</span>
                            </Link>

                            <button
                                onClick={toggleMenu}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            >
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150"
                                        >
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150"
                                            >
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <ThemeTrigger />
                                {isPending ? (
                                    <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                                ) : session ? (
                                    <UserDashboard
                                        name={session.user.name}
                                        email={session.user.email}
                                        avatarUrl={session.user.image}
                                    />
                                ) : (
                                    <>
                                        <Button asChild variant="outline" size="sm">
                                            <Link href="/login">
                                                <span>Login</span>
                                            </Link>
                                        </Button>
                                        <Button asChild size="sm">
                                            <Link href="/signup">
                                                <span>Get Started</span>
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
