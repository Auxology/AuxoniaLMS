import { fileUploadSchema } from '@/features/admin/types/file-upload-schema';
import { s3Client } from '@/lib/s3-client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { v7 as uuidv7 } from 'uuid';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('S3 upload request body:', body);

        const validation = fileUploadSchema.safeParse(body);

        if (!validation.success) {
            console.error('Validation failed:', validation.error.message);
            return NextResponse.json({ error: validation.error.message }, { status: 400 });
        }

        const { fileName, contentType, size } = validation.data;
        const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES as string;

        console.log('S3 configuration:', {
            bucketName,
            region: process.env.AWS_REGION,
            endpoint: process.env.AWS_ENDPOINT_URL_S3,
        });

        const unique = `${uuidv7()}-${fileName}`;
        console.log('Generated key:', unique);

        const command = new PutObjectCommand({
            Bucket: bucketName,
            ContentType: contentType,
            ContentLength: size,
            Key: unique,
        });

        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 360 });
        console.log('Generated presigned URL:', presignedUrl);

        const response = {
            presignedUrl,
            key: unique,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('S3 upload error:', error);
        return NextResponse.json({ error: 'Failed to generate presigned URL' }, { status: 500 });
    }
}
