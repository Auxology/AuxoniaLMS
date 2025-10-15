import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        AUTH_GITHUB_CLIENT_ID: z.string().min(1),
        AUTH_GITHUB_CLIENT_SECRET: z.string().min(1),
        BETTER_AUTH_URL: z.string().url(),
        STRIPE_WEBHOOK_SECRET: z.string().min(1),
        STRIPE_SECRET_KEY: z.string().min(1),
        ARCJET_KEY: z.string().min(1),
        RESEND_API_KEY: z.string().min(1),
        AWS_REGION: z.string().min(1),
        AWS_ENDPOINT_URL_S3: z.string().url(),
        AWS_ACCESS_KEY_ID: z.string().min(1),
        AWS_SECRET_ACCESS_KEY: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES: z.string().min(1),
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        AUTH_GITHUB_CLIENT_ID: process.env.AUTH_GITHUB_CLIENT_ID,
        AUTH_GITHUB_CLIENT_SECRET: process.env.AUTH_GITHUB_CLIENT_SECRET,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        ARCJET_KEY: process.env.ARCJET_KEY,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        AWS_REGION: process.env.AWS_REGION,
        AWS_ENDPOINT_URL_S3: process.env.AWS_ENDPOINT_URL_S3,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
    },
});
