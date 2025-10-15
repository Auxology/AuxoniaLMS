import { fileUploadSchema } from '@/features/admin/types/file-upload-schema';
import arcjet from '@/lib/arcjet';
import { s3Client } from '@/lib/s3-client';
import { detectBot, fixedWindow } from '@arcjet/next';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { v7 as uuidv7 } from 'uuid';
import { requireAdmin } from '@/features/admin/data/require-admin';
import { env } from '@/env';

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

export async function POST(req: Request) {
    const session = await requireAdmin();

    try {
        const decision = await aj.protect(req, { fingerprint: session.user.id });

        if (decision.isDenied()) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        const body = await req.json();

        const validation = fileUploadSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.message }, { status: 400 });
        }

        const { fileName, contentType, size } = validation.data;
        const bucketName = env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES;

        const unique = `${uuidv7()}-${fileName}`;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            ContentType: contentType,
            ContentLength: size,
            Key: unique,
        });

        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 360 });

        const response = {
            presignedUrl,
            key: unique,
        };

        return NextResponse.json(response, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'Failed to generate presigned URL' }, { status: 500 });
    }
}
