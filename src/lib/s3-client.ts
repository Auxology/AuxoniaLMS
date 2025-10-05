import 'server-only';

import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
    region: process.env.AWS_REGION as string,
    endpoint: process.env.AWS_ENDPOINT_URL_S3 as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    forcePathStyle: false,
});
