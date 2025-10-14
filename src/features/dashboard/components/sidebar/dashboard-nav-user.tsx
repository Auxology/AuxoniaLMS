'use client';

import {
    IconCreditCard,
    IconDashboard,
    IconDotsVertical,
    IconHome,
    IconLogout,
    IconNotification,
} from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import { getUserDisplayInfo } from '@/lib/user-display';
import Link from 'next/link';
import { Tv2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useLogout } from '@/features/shared/hooks/use-logout';

export function DashboardNavUser() {
    const { isMobile } = useSidebar();
    const { data: session, isPending } = authClient.useSession();
    const handleLogout = useLogout();

    if (isPending) {
        return (
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        );
    }

    if (!session?.user) {
        return null; // Don't render if no user session
    }

    const { displayName, avatarFallback } = getUserDisplayInfo({
        name: session.user.name,
        email: session.user.email || '',
    });

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={
                                        session?.user.image ??
                                        `https://avatar.vercel.sh/${session?.user.name}`
                                    }
                                    alt={session?.user.name}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {avatarFallback}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{displayName}</span>
                                <span className="text-muted-foreground truncate text-xs">
                                    {session?.user.email}
                                </span>
                            </div>
                            <IconDotsVertical className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={
                                            session?.user.image ??
                                            `https://avatar.vercel.sh/${session?.user.name}`
                                        }
                                        alt={session?.user.name}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {avatarFallback}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{displayName}</span>
                                    <span className="text-muted-foreground truncate text-xs">
                                        {session?.user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link href="/">
                                    <IconHome />
                                    Home Page
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard">
                                    <IconDashboard />
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/courses">
                                    <Tv2 />
                                    Courses
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <IconLogout />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
