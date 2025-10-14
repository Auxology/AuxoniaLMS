import { s3Client } from '@/lib/s3-client';
import arcjet from '@/lib/arcjet';
import { detectBot, fixedWindow } from '@arcjet/next';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/features/admin/data/require-admin';

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

export async function DELETE(request: Request) {
    const session = await requireAdmin();

    try {
        const decision = await aj.protect(request, { fingerprint: session.user.id });

        if (decision.isDenied()) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        const body = await request.json();

        const key = body.key;

        if (!key) return NextResponse.json({ error: 'Key is required' }, { status: 400 });

        const command = new DeleteObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES as string,
            Key: key,
        });

        await s3Client.send(command);

        return NextResponse.json({ message: 'File deleted successfully' }, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
    }
}
