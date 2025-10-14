'use server';

import prisma from '@/lib/prisma';
import { courseSchema, CourseSchemaType } from '@/lib/zod-schemas';
import type { CreateCourseResponse } from '../types/admin-action-response';
import { requireAdmin } from '../data/require-admin';
import arcjet from '@/lib/arcjet';
import { detectBot, fixedWindow, request } from '@arcjet/next';
import { stripe } from '@/features/payment/lib/stripe';

const aj = arcjet
    .withRule(
        detectBot({
            mode: 'LIVE',
            allow: [],
        })
    )
    .withRule(
        fixedWindow({
            mode: 'LIVE',
            window: '1m',
            max: 5,
        })
    );

export async function createCourse(input: CourseSchemaType): Promise<CreateCourseResponse> {
    const session = await requireAdmin();

    try {
        const req = await request();
        const decision = await aj.protect(req, { fingerprint: session.user.id });

        const validation = courseSchema.safeParse(input);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return { status: 'error', message: 'Too many requests' };
            } else {
                return { status: 'error', message: 'Malicious activity detected' };
            }
        }

        if (!validation.success) {
            return { status: 'error', message: validation.error.message };
        }

        const stripeProduct = await stripe.products.create({
            name: validation.data.title,
            description: validation.data.smallDescription,
            metadata: {
                courseId: 'temp',
            },
        });

        const stripePrice = await stripe.prices.create({
            unit_amount: validation.data.price * 100,
            currency: 'usd',
            product: stripeProduct.id,
        });

        await prisma.course.create({
            data: {
                ...validation.data,
                userId: session.user.id,
                stripePriceId: stripePrice.id,
                stripeProductId: stripeProduct.id,
            },
        });

        return { status: 'success', message: 'Course created successfully' };
    } catch {
        return { status: 'error', message: 'Failed to create course' };
    }
}
