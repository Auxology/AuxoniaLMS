'use server';

import { stripe } from '../lib/stripe';
import { requireUser } from '../data/require-user';
import { PaymentResponse } from '../types/payment-action-response';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import arcjet from '@/lib/arcjet';
import { detectBot, fixedWindow, request } from '@arcjet/next';

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

export async function enrollInCourse(courseId: string): Promise<PaymentResponse | never> {
    const session = await requireUser();

    let checkoutUrl = null;

    try {
        const req = await request();

        const decision = await aj.protect(req, { fingerprint: session.user.id });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return { status: 'error', message: 'Too many requests' };
            } else {
                return { status: 'error', message: 'Malicious activity detected' };
            }
        }

        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                id: true,
                title: true,
                price: true,
                slug: true,
                userId: true,
            },
        });

        if (!course) return { status: 'error', message: 'Course not found' };

        let stripeCustomerId = null;

        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                stripeCustomerId: true,
            },
        });

        if (!user) return { status: 'error', message: 'User not found' };

        if (!user.stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name,
                metadata: {
                    userId: user.id,
                },
            });

            stripeCustomerId = customer.id;

            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    stripeCustomerId: customer.id,
                },
            });
        }

        if (!stripeCustomerId)
            return { status: 'error', message: 'Failed to create stripe customer' };

        const result = await prisma.$transaction(async tx => {
            if (user.id === course.userId)
                return { status: 'error', message: 'You cannot enroll in your own course' };

            const existingEnrollment = await tx.enrollment.findUnique({
                where: {
                    userId_courseId: {
                        userId: user.id,
                        courseId: courseId,
                    },
                },
                select: {
                    id: true,
                    status: true,
                },
            });

            if (existingEnrollment?.status === 'Active')
                return { status: 'success', message: 'You are already enrolled in this course' };

            let enrollment;

            if (existingEnrollment) {
                enrollment = await tx.enrollment.update({
                    where: { id: existingEnrollment.id },
                    data: {
                        amount: course.price,
                        status: 'Pending',
                        updatedAt: new Date(),
                    },
                });
            } else {
                enrollment = await tx.enrollment.create({
                    data: {
                        userId: user.id,
                        courseId: courseId,
                        status: 'Pending',
                        amount: course.price,
                    },
                });
            }

            const checkoutSession = await stripe.checkout.sessions.create({
                customer: stripeCustomerId,
                line_items: [
                    {
                        price: 'price_1SHj2NHkU9w7MpP3dfPIN09e',
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                cancel_url: `${process.env.BETTER_AUTH_URL}/payment/cancel`,
                success_url: `${process.env.BETTER_AUTH_URL}/payment/success`,
                metadata: {
                    userId: user.id,
                    courseId: courseId,
                    enrollmentId: enrollment.id,
                },
            });

            return {
                enrollment: enrollment,
                checkoutUrl: checkoutSession.url,
            };
        });

        if (!result.checkoutUrl)
            return { status: 'error', message: 'Failed to create checkout session' };

        checkoutUrl = result.checkoutUrl;
    } catch (error) {
        if (error instanceof Stripe.errors.StripeError) {
            return { status: 'error', message: 'Payment failed, please try again.' };
        }

        return { status: 'error', message: 'Failed to enroll in course' };
    }

    redirect(checkoutUrl);
}
