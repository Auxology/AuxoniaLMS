import z from 'zod';

export const lessonSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters longs' }),
    courseId: z.string().uuid({ message: 'Invalid course Id.' }),
    chapterId: z.string().uuid({ message: 'Invalid chapter Id.' }),
    description: z
        .string()
        .min(10, { message: 'Description must be at least 10 characters longs' })
        .optional(),
    videoKey: z.string().optional(),
    thumbnailKey: z.string().optional(),
});

export type LessonSchemaType = z.infer<typeof lessonSchema>;
