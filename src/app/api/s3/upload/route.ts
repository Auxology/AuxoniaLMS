import { fileUploadSchema } from '@/features/admin/types/file-upload-schema';
import { s3Client } from '@/lib/s3-client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { v7 as uuidv7 } from 'uuid';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const validation = fileUploadSchema.safeParse(body);

        if (!validation.success)
            return NextResponse.json({ error: validation.error.message }, { status: 400 });

        const { fileName, contentType, size } = validation.data;

        const unique = `${uuidv7()}-${fileName}`;

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME as string,
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
