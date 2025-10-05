import z from 'zod'

const level = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const

const courseStatus = ['Draft', 'Published', 'Archived'] as const

const categories = [
    'Development',
    'Design',
    'Marketing',
    'Business',
    'Photography',
    'Coding',
] as const

export const courseSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters long')
        .max(100, 'Title cannot exceed 100 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters long'),

    fileKey: z.string().min(1, 'File key is required'),

    price: z.number().min(1, 'Price must be at least $1'),

    duration: z
        .number()
        .min(1, 'Duration must be at least 1 hour')
        .max(500, 'Duration cannot exceed 500 hours'),

    level: z.enum(level, { message: 'Level must be BEGINNER, INTERMEDIATE, or ADVANCED' }),
    category: z.enum(categories, { message: 'Invalid category selected' }),
    smallDescription: z
        .string()
        .min(10, 'Short description must be at least 10 characters long')
        .max(200, 'Short description cannot exceed 200 characters'),

    slug: z.string().min(3, 'Slug must be at least 3 characters long'),

    status: z.enum(courseStatus, { message: 'Status must be Draft, Published, or Archived' }),
})

export type CourseSchemaType = z.infer<typeof courseSchema>
