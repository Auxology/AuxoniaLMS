'use client'

import {
    BookOpenIcon,
    ChevronDownIcon,
    HomeIcon,
    Layers2Icon,
    LogOutIcon,
    SettingsIcon,
    UserIcon,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTransition } from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

interface NavigationLink {
    name: string
    href: string
    icon: LucideIcon
}

interface UserDashboardProps {
    name?: string | null
    email: string
    avatarUrl?: string | null
}

interface UserMenuItem {
    name: string
    href?: string
    icon: LucideIcon
    onClick?: () => void
}

const navigationLinks: NavigationLink[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Courses', href: '/courses', icon: BookOpenIcon },
    { name: 'Dashboard', href: '/dashboard', icon: Layers2Icon },
]

const userMenuItems: UserMenuItem[] = [
    { name: 'Profile', href: '/profile', icon: UserIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
]

export default function UserDashboard({ name, email, avatarUrl }: UserDashboardProps) {
    const router = useRouter()
    const [isLoggingOut, startLogoutTransition] = useTransition()

    const handleLogout = (): void => {
        startLogoutTransition(async () => {
            try {
                await authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            router.push('/')
                            toast.success('Logged out successfully!')
                        },
                        onError: ctx => {
                            console.error('Logout error:', ctx.error)
                            toast.error('Error logging out. Please try again.')
                        },
                    },
                })
            } catch (error) {
                console.error('Unexpected logout error:', error)
                toast.error('Error logging out. Please try again.')
            }
        })
    }

    const getAvatarFallback = (): string => {
        if (name) {
            const nameParts = name.split(' ')
            return nameParts.length > 1
                ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
                : name.slice(0, 2).toUpperCase()
        }
        return email.slice(0, 2).toUpperCase()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                    <Avatar>
                        <AvatarImage
                            src={avatarUrl || undefined}
                            alt={`${name || email} profile image`}
                        />
                        <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                    </Avatar>
                    <ChevronDownIcon size={16} className="opacity-60" aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-foreground truncate text-sm font-medium">
                        {name || email}
                    </span>
                    {name && (
                        <span className="text-muted-foreground truncate text-xs font-normal">
                            {email}
                        </span>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {navigationLinks.map(link => {
                        const Icon = link.icon
                        return (
                            <DropdownMenuItem key={link.href} asChild>
                                <Link href={link.href}>
                                    <Icon size={16} className="opacity-60" aria-hidden="true" />
                                    <span>{link.name}</span>
                                </Link>
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {userMenuItems.map(item => {
                        const Icon = item.icon
                        return (
                            <DropdownMenuItem key={item.name} asChild>
                                <Link href={item.href!}>
                                    <Icon size={16} className="opacity-60" aria-hidden="true" />
                                    <span>{item.name}</span>
                                </Link>
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="focus:bg-destructive focus:text-destructive-foreground"
                >
                    <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
                    <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
