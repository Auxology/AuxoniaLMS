import { CloudUploadIcon, ImageIcon, TrashIcon } from 'lucide-react';
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

export function RenderUploadedState({ previewUrl }: { previewUrl: string }) {
    return (
        <div>
            <Image src={previewUrl} alt="Uploaded" fill className="object-contain p-2" />;
            <Button type="button" variant="destructive" className={cn(
                `absolute top-4 right-4`
            )}>
                <TrashIcon className="size-4 text-destructive"/>
            </Button>
        </div>
    );
}

export function RenderUploadingState({progress, file} : {progress: number, file: File}) {
    return (
        <div className="text-center justify-center items-center flex-col">
            <p className="mt-2 text-sm font-medium text-foreground">{progress}%</p>
            
            <p className="mt-2 text-sm font-medium text-foreground">Uploading ...</p>

            <p className="mt-1 text-xs text-muted-foreground truncate max-w-xs">{file.name}</p>
        </div>
    )
}
