import { stripe } from '@/features/payment/lib/stripe';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { env } from '@/env';

export async function POST(req: Request) {
    try {
        if (!env.STRIPE_WEBHOOK_SECRET) {
            return new Response('Webhook secret not configured', { status: 500 });
        }

        const body = await req.text();
        const headersList = await headers();
        const signature = headersList.get('Stripe-Signature');

        if (!signature) {
            return new Response('No signature', { status: 400 });
        }

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                env.STRIPE_WEBHOOK_SECRET
            );
        } catch {
            return new Response('Invalid signature', { status: 401 });
        }

        const session = event.data.object as Stripe.Checkout.Session;

        if (!session.metadata) {
            return new Response('No metadata', { status: 400 });
        }

        switch (event.type) {
            case 'checkout.session.completed':
                const courseId = session.metadata.courseId;
                const customerId = session.customer as string;
                const enrollmentId = session.metadata.enrollmentId;

                if (!courseId) {
                    return new Response('No course id', { status: 400 });
                }
                if (!customerId) {
                    return new Response('No customer id', { status: 400 });
                }
                if (!enrollmentId) {
                    return new Response('No enrollment id', { status: 400 });
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            stripeCustomerId: customerId,
                        },
                    });

                    if (!user) {
                        return new Response('User not found', { status: 404 });
                    }

                    await prisma.enrollment.update({
                        where: {
                            id: enrollmentId,
                        },
                        data: {
                            userId: user.id,
                            courseId: courseId,
                            amount: session.amount_total as number,
                            status: 'Active',
                        },
                    });
                } catch {
                    return new Response('Database error', { status: 500 });
                }
                break;

            default:
                return new Response('Event type not handled', { status: 200 });
        }

        return new Response('Webhook processed successfully', { status: 200 });
    } catch {
        return new Response('Internal server error', { status: 500 });
    }
}
