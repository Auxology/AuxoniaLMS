'use server';

import { LoginForm } from '@/features/auth/components/forms/login-form';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        return redirect('/');
    }

    return (
        <section className="min-h-svh w-full flex flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </section>
    );
}
