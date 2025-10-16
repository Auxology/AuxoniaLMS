'use server';

import { courseSchema, CourseSchemaType } from '../schemas/course-schemas';
import { requireAdmin } from '../data/require-admin';
import { AdminActionResponse } from '../types/admin-action-response';
import prisma from '@/lib/prisma';
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

export async function editCourse(data: CourseSchemaType, id: string): Promise<AdminActionResponse> {
    const user = await requireAdmin();

    try {
        const req = await request();

        const decision = await aj.protect(req, { fingerprint: user.user.id });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return { status: 'error', message: 'Too many requests' };
            } else {
                return { status: 'error', message: 'Malicious activity detected' };
            }
        }

        const result = courseSchema.safeParse(data);

        if (!result.success) {
            return { status: 'error', message: result.error.message };
        }

        const currentCourse = await prisma.course.findUnique({
            where: { id: id, userId: user.user.id },
            select: { price: true, stripeProductId: true },
        });

        if (!currentCourse) {
            return { status: 'error', message: 'Course not found' };
        }

        const updateData: CourseSchemaType & { updatedAt: Date; stripePriceId?: string } = {
            ...result.data,
            updatedAt: new Date(),
        };

        if (currentCourse.price !== result.data.price) {
            const stripePrice = await stripe.prices.create({
                unit_amount: result.data.price * 100,
                currency: 'usd',
                product: currentCourse.stripeProductId,
            });

            updateData.stripePriceId = stripePrice.id;
        }

        await prisma.course.update({
            where: { id: id, userId: user.user.id },
            data: updateData,
        });

        return { status: 'success', message: 'Course updated successfully' };
    } catch {
        return { status: 'error', message: 'Failed to update course' };
    }
}
