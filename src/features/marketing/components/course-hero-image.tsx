import Image from 'next/image';
import { useConstructUrl } from '@/features/shared/hooks/use-construct';

interface CourseHeroImageProps {
    fileKey: string;
    title: string;
}

export function CourseHeroImage({ fileKey, title }: CourseHeroImageProps) {
    const url = useConstructUrl(fileKey);

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-2xl">
            {url ? (
                <Image
                    src={url}
                    alt={`${title} course thumbnail`}
                    fill
                    className="w-full h-full object-cover"
                    priority
                />
            ) : (
                <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <p className="text-muted-foreground">No image available</p>
                    </div>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
    );
}
