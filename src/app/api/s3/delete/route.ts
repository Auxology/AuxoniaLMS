import { s3Client } from '@/lib/s3-client';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    try {
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
