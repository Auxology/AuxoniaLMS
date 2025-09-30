import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon, ShieldXIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotAdminPage() {
    return (
        <div className="min-h-svh w-full flex items-center justify-center p-6 md:p-10">
            <Card className="max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="bg-destructive/10 rounded-full p-4 w-fit mx-auto">
                        <ShieldXIcon className="size-16 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl">Access Denied</CardTitle>
                    <CardDescription className="max-w-xs mx-auto">You are not admin! You must be admin to create courses.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Link href="/" className={buttonVariants({ className: "w-full" })}>
                        <ArrowLeftIcon className="mr-1 size-4" />
                        Back to Home
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}