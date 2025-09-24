'use client'

import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { type Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import {
    AlignCenterIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    ItalicIcon,
    ListIcon,
    ListOrderedIcon,
    RedoIcon,
    StrikethroughIcon,
    UndoIcon,
} from 'lucide-react'

interface iMenuProps {
    editor: Editor | null
}

export function Menubar({ editor }: iMenuProps) {
    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({
            isBold: editor?.isActive('bold') ?? false,
            isItalic: editor?.isActive('italic') ?? false,
            isStrike: editor?.isActive('strike') ?? false,
            isHeading1: editor?.isActive('heading', { level: 1 }) ?? false,
            isHeading2: editor?.isActive('heading', { level: 2 }) ?? false,
            isHeading3: editor?.isActive('heading', { level: 3 }) ?? false,
            isBulletList: editor?.isActive('bulletList') ?? false,
            isOrderedList: editor?.isActive('orderedList') ?? false,
            isTextAlignLeft: editor?.isActive({ textAlign: 'left' }) ?? false,
            isTextAlignCenter: editor?.isActive({ textAlign: 'center' }) ?? false,
            isTextAlignRight: editor?.isActive({ textAlign: 'right' }) ?? false,
        }),
    })

    if (!editor) {
        return null
    }

    return (
        <div className="border border-input border-t-0 border-x-0 rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
            <TooltipProvider>
                <div className="flex flex-wrap gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editorState?.isBold}
                                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                                className={cn(
                                    editorState?.isBold && 'bg-muted text-muted-foreground'
                                )}
                            >
                                <BoldIcon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Bold</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editorState?.isItalic}
                                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                                className={cn(
                                    editorState?.isItalic && 'bg-muted text-muted-foreground'
                                )}
                            >
                                <ItalicIcon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Italic</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editorState?.isStrike}
                                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                                className={cn(
                                    editorState?.isStrike && 'bg-muted text-muted-foreground'
                                )}
                            >
                                <StrikethroughIcon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Strikethrough</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editorState?.isHeading1}
                                onPressedChange={() =>
                                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                                }
                                className={cn(
                                    editorState?.isHeading1 && 'bg-muted text-muted-foreground'
                                )}
                            >
                                <Heading1Icon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Heading 1</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editorState?.isHeading2}
                                onPressedChange={() =>
                                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                                }
                                className={cn(
                                    editorState?.isHeading2 && 'bg-muted text-muted-foreground'
                                )}
                            >
                                <Heading2Icon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Heading 2</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editorState?.isHeading3}
                                onPressedChange={() =>
                                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                                }
                                className={cn(
                                    editorState?.isHeading3 && 'bg-muted text-muted-foreground'
                                )}
                            >
                                <Heading3Icon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Heading 3</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editorState?.isBulletList}
                                onPressedChange={() =>
                                    editor.chain().focus().toggleBulletList().run()
                                }
                                className={cn(
                                    editorState?.isBulletList && 'bg-muted text-muted-foreground'
                                )}
                            >
                                <ListIcon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Bullet List</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editorState?.isOrderedList}
                                onPressedChange={() =>
                                    editor.chain().focus().toggleOrderedList().run()
                                }
                                className={cn(
                                    editorState?.isOrderedList && 'bg-muted text-muted-foreground'
                                )}
                            >
                                <ListOrderedIcon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Ordered List</TooltipContent>
                    </Tooltip>
                </div>

                <div className="w-px h-6 bg-border mx-2"></div>

                <div className="flex flex-wrap gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editorState?.isTextAlignLeft}
                                onPressedChange={() => {
                                    editor.chain().focus().setTextAlign('left').run()
                                }}
                                className={cn(
                                    editorState?.isTextAlignLeft && 'bg-muted text-muted-foreground'
                                )}
                            >
                                <AlignLeftIcon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Align Left</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editorState?.isTextAlignCenter}
                                onPressedChange={() => {
                                    editor.chain().focus().setTextAlign('center').run()
                                }}
                                className={cn(
                                    editorState?.isTextAlignCenter &&
                                        'bg-muted text-muted-foreground'
                                )}
                            >
                                <AlignCenterIcon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Align Center</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={editorState?.isTextAlignRight}
                                onPressedChange={() => {
                                    editor.chain().focus().setTextAlign('right').run()
                                }}
                                className={cn(
                                    editorState?.isTextAlignRight &&
                                        'bg-muted text-muted-foreground'
                                )}
                            >
                                <AlignRightIcon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>Align Right</TooltipContent>
                    </Tooltip>
                </div>

                <div className="w-px h-6 bg-border mx-2"></div>

                <div className="flex flex-wrap gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                                type="button"
                                onClick={() => editor.chain().focus().undo().run()}
                                disabled={!editor.can().undo()}
                            >
                                <UndoIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Undo</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                                type="button"
                                onClick={() => editor.chain().focus().redo().run()}
                                disabled={!editor.can().redo()}
                            >
                                <RedoIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Redo</TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>
        </div>
    )
}
