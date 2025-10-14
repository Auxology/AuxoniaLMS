import 'server-only';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

async function requireAdminNonCached() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect('/login');
    }

    if (session?.user.role !== 'admin') {
        redirect('/not-admin');
    }

    return session;
}

export const requireAdmin = cache(requireAdminNonCached);