'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { RenderEmptyState } from './render-state';
import { toast } from 'sonner';
import { useState } from 'react';
import { v7 as uuidv7 } from 'uuid';

interface FileState {
    id: string | null;
    file: File | null;
    uploading: boolean;
    progress: number;
    key?: string;
    isDeleted: boolean;
    error: boolean;
    objectUrl?: string;
    fileType: 'image' | 'video';
}

export function Uploader() {
    const [fileState, setFileState] = useState<FileState>({
        id: null,
        file: null,
        uploading: false,
        progress: 0,
        isDeleted: false,
        error: false,
        fileType: 'image',
    });

    function uploadFile(file: File) {
        setFileState((prev) => ({
            ...prev,
            uploading: true,
            progress: 0,
        }));

        try {

        }
        
        catch {}
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];

            setFileState({
                file,
                uploading: false,
                progress: 0,
                objectUrl: URL.createObjectURL(file),
                error: false,
                id: uuidv7(),
                isDeleted: false,
                fileType: 'image',
            });
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1,
        multiple: false,
        maxSize: 5 * 1024 * 1024,
        onDropRejected: rejectedFiles,
    });

    function rejectedFiles(fileRejections: FileRejection[]) {
        if (fileRejections.length) {
            const tooManyFiles = fileRejections.find(
                rejection => rejection.errors[0].code === 'too-many-files'
            );

            const fileTooLarge = fileRejections.find(
                rejection => rejection.errors[0].code === 'file-too-large'
            );

            if (tooManyFiles) {
                toast.error('You can only upload one file at a time');
            }

            if (fileTooLarge) {
                toast.error('File is too large');
            }
        }
    }

    return (
        <Card
            {...getRootProps()}
            className={cn(
                'relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64',
                isDragActive ? 'border-primary bg-primary' : 'border-border hover:border-primary'
            )}
        >
            <CardContent className="flex items-center justify-center h-full w-full p-4">
                <input {...getInputProps()} />
                <RenderEmptyState isDragActive={isDragActive} />
            </CardContent>
        </Card>
    );
}
