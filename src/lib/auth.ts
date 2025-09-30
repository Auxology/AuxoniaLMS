import { betterAuth } from 'better-auth';
import { emailOTP } from 'better-auth/plugins/email-otp';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';
import { resend } from './resend';
import { VerificationEmailTemplate } from '@/features/auth/components/verification-email-template';
import { admin } from 'better-auth/plugins/admin';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    socialProviders: {
        github: {
            clientId: process.env.AUTH_GITHUB_CLIENT_ID as string,
            clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET as string,
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
