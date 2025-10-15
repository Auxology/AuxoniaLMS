import { betterAuth } from 'better-auth';
import { emailOTP } from 'better-auth/plugins/email-otp';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';
import { resend } from './resend';
import { VerificationEmailTemplate } from '@/features/auth/components/verification-email-template';
import { admin } from 'better-auth/plugins/admin';
import { env } from '@/env';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    socialProviders: {
        github: {
            clientId: env.AUTH_GITHUB_CLIENT_ID,
            clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
        },
    },

    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp }) {
                await resend.emails.send({
                    from: 'AuxoniaLMS <onboarding@resend.dev>',
                    to: [email],
                    subject: 'AuxoniaLMS - Verification Code',
                    react: VerificationEmailTemplate({ code: otp }),
                });
            },
        }),
        admin(),
    ],
});
