import { CloudUploadIcon, ImageIcon, Loader2, TrashIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
    return (
        <div className="text-center">
            <div className="flex items-center justify-center mx-auto size-12 rounded-full bg-muted mb-4">
                <CloudUploadIcon
                    className={cn('size-6 text-muted-foreground', isDragActive && 'text-primary')}
                />
            </div>
            <p className="text-base font-semibold text-foreground">
                Drop your files here or{' '}
                <span className="text-primary font-bold">click to upload</span>
            </p>
            <Button type="button" variant="outline" className="mt-4">
                Select File
            </Button>
        </div>
    );
}

export function RenderErrorState() {
    return (
        <div className="text-center">
            <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4">
                <ImageIcon className={cn('size-6 text-destructive')} />
            </div>
            <p className="text-base font-semibold">Upload Failed</p>
            <p className="text-xl mt-1 text-muted-foreground">Something went wrong</p>
            <Button type="button" className="mt-4">
                Retry Again
            </Button>
        </div>
    );
}

export function RenderUploadedState({
    previewUrl,
    isDeleting,
    handleRemoveFile,
    fileType,
}: {
    previewUrl: string;
    isDeleting: boolean;
    fileType: 'image' | 'video';
    handleRemoveFile: () => void;
}) {
    return (
        <div className="relative group w-full h-full flex items-center justify-center">
            {fileType === 'video' ? (
                <video src={previewUrl} controls className="w-full h-full object-contain p-2" />
            ) : (
                <Image
                    src={previewUrl}
                    alt="Uploaded file preview"
                    fill
                    className="object-contain p-2"
                />
            )}
            <Button
                onClick={handleRemoveFile}
                disabled={isDeleting}
                type="button"
                variant={'destructive'}
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 p-0"
            >
                {isDeleting ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <TrashIcon className="size-4" />
                )}
            </Button>
        </div>
    );
}

export function RenderUploadingState({ progress, file }: { progress: number; file: File }) {
    return (
        <div className="text-center justify-center items-center flex-col">
            <p className="mt-2 text-sm font-medium text-foreground">{progress}%</p>

            <p className="mt-2 text-sm font-medium text-foreground">Uploading ...</p>

            <p className="mt-1 text-xs text-muted-foreground truncate max-w-xs">{file.name}</p>
        </div>
    );
}
