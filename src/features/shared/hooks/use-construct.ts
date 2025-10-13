export function useConstructUrl(key: string): string | undefined {
    if (!key || key.trim() === '') {
        return undefined;
    }
    return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.t3.storage.dev/${key}`;
}
