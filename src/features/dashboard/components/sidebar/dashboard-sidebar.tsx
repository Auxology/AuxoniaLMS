'use client';

import * as React from 'react';
import {
    IconCamera,
    IconDashboard,
    IconFileAi,
    IconFileDescription,
    IconListDetails,
} from '@tabler/icons-react';

import { DashboardNavMain } from '@/features/dashboard/components/sidebar/dashboard-nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { DashboardNavUser } from './dashboard-nav-user';

const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: IconDashboard,
        },
        {
            title: 'Courses',
            url: '/dashboard/courses',
            icon: IconListDetails,
        },
    ],
};

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <span className="text-base font-semibold">AuxoniaLMS</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <DashboardNavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <DashboardNavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
