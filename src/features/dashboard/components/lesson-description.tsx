'use client';

import { useEffect, useState } from 'react';
import { generateHTML } from '@tiptap/html';
import { type JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import parse from 'html-react-parser';

const LessonDescriptionClient = ({ json }: { json: JSONContent }) => {
    const [output, setOutput] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const htmlOutput = generateHTML(json, [StarterKit, TextAlign]);
        setOutput(htmlOutput);
    }, [json]);

    if (!isClient) {
        return (
            <div className="prose dark:prose-invert prose-li:marker:text-primary">
                <div className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="prose dark:prose-invert prose-li:marker:text-primary">{parse(output)}</div>
    );
};

export const LessonDescription = ({ json }: { json: JSONContent }) => {
    return <LessonDescriptionClient json={json} />;
};
