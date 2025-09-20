"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import {RiGithubFill} from "@remixicon/react";
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const [gitHubPending, startGitHubTransition] = useTransition();
    const [otpPending, startOtpTransition] = useTransition();
    const [email, setEmail] = useState("");

    async function LoginWithGitHub() {
        startGitHubTransition(async () => {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Logged in successfully, redirecting...");
                    },
                    onError: (error) => {
                        toast.error(`${error.error.message}`);
                    }
                }
            })
        })
    }

    function LoginWithOtp() {
        startOtpTransition(async () => {
            await authClient.emailOtp.sendVerificationOtp({
                email: email,
                type: "sign-in",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("OTP sent to your email.");
                        router.push(`/verify-request?email=${email}`);
                    },
                    onError: (error) => {
                        toast.error(`${error.error.message}`);
                    }
                }
            })
        })
    }

    return (
        <form
            action=""
            className="max-w-92 m-auto h-fit w-full">
            <div className="p-6">
                <div>
                    <h1 className="mb-1 mt-4 text-xl font-semibold">AuxoniaLMS</h1>
                    <p>Welcome back! Login to continue</p>
                </div>

                <div className="mt-6">
                    <Button
                        disabled={gitHubPending}
                        onClick={LoginWithGitHub}
                        className="w-full"
                        variant="outline"
                        type="button"
                    >
                        {gitHubPending?
                            <>
                                <Loader className="size-4 animate-spin" />
                                <span>Loading...</span>
                            </>
                            :
                            <>
                                <RiGithubFill className="mr-2 h-4 w-4" /> Continue with GitHub
                            </>
                        }
                    </Button>
                </div>

                <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <hr className="border-dashed" />
                    <span className="text-muted-foreground text-xs">Or continue With</span>
                    <hr className="border-dashed" />
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label
                            htmlFor="email"
                            className="block text-sm">
                            Email
                        </Label>
                        <Input
                            type="email"
                            required
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <Button
                        disabled={otpPending || email.length === 0}
                        onClick={LoginWithOtp}
                        className="w-full"
                        type="button"
                    >
                        {otpPending?
                            <>
                                <Loader className="size-4 animate-spin" />
                                <span>Loading...</span>
                            </>
                            :
                            <span>Continue</span>
                        }
                    </Button>
                </div>
            </div>
        </form>
    )
}