'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import {
    RenderEmptyState,
    RenderErrorState,
    RenderUploadedState,
    RenderUploadingState,
} from './render-state';
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

    async function uploadFile(file: File) {
        setFileState(prev => ({
            ...prev,
            uploading: true,
            progress: 0,
        }));

        try {
            const presignedResponse = await fetch('/api/s3/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size,
                    isImage: true,
                }),
            });

            if (!presignedResponse.ok) {
                toast.error('Failed to get presigned URL');
                setFileState(prev => ({
                    ...prev,
                    uploading: false,
                    progress: 0,
                    error: true,
                }));

                return;
            }

            const { presignedUrl, key } = await presignedResponse.json();

            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.upload.onprogress = event => {
                    if (event.lengthComputable) {
                        const percentageComplete = (event.loaded / event.total) * 100;
                        setFileState(prev => ({
                            ...prev,
                            progress: Math.round(percentageComplete),
                        }));
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200 || xhr.status === 204) {
                        setFileState(prev => ({
                            ...prev,
                            uploading: false,
                            progress: 100,
                            error: false,
                            key: key,
                        }));

                        toast.success('File uploaded successfully');

                        resolve();
                    } else {
                        reject(new Error('Failed to upload file'));
                    }
                };

                xhr.onerror = () => {
                    reject(new Error('Failed to upload file'));
                };

                xhr.open('PUT', presignedUrl);
                xhr.setRequestHeader('Content-Type', file.type);
                xhr.send(file);
            });
        } catch {
            toast.error('Something went wrong');

            setFileState(prev => ({
                ...prev,
                uploading: false,
                progress: 0,
                error: true,
            }));
        }
    }

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];

                if (fileState.objectUrl && !fileState.objectUrl.startsWith('http')) {
                    URL.revokeObjectURL(fileState.objectUrl);
                }

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

                uploadFile(file);
            }
        },
        [fileState.objectUrl]
    );

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

    function renderContent() {
        if (fileState.uploading) {
            return (
                <RenderUploadingState progress={fileState.progress} file={fileState.file as File} />
            );
        }

        if (fileState.error) {
            return <RenderErrorState />;
        }

        if (fileState.objectUrl) {
            return <RenderUploadedState previewUrl={fileState.objectUrl} />;
        }

        return <RenderEmptyState isDragActive={isDragActive} />;
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
                {renderContent()}
            </CardContent>
        </Card>
    );
}
