'use server';

import { RequireAdmin } from "./require-admin";
import prisma from "@/lib/prisma";
import { AdminGetLessonType } from "../types/admin-get-lesson-type";
import { notFound } from "next/navigation";

export default async function AdminGetLesson(id: string): Promise<AdminGetLessonType> {
    await RequireAdmin();

    const lesson = await prisma.lesson.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            description: true,
            thumbnailKey: true,
            videoKey: true,
            position: true,
        },
    });
    
    if (!lesson)
        return notFound();

    return lesson;
}