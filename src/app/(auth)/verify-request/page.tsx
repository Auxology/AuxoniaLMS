"use client"

import { useState, useTransition } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function VerifyRequestPage() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [otpPending, startOtpTransition] = useTransition();
    const params = useSearchParams();
    const email = params.get("email" ) as string;
    const otpIsFilled = otp.length === 6;

    function verifyOtp() {
        startOtpTransition(async() => {
            await authClient.signIn.emailOtp({
                email: email,
                otp: otp,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Email Verified");
                        router.push("/");
                    },
                    onError: () => {
                        toast.error("Invalid or Expired OTP, please try again.");
                    }
                }
            })
        })
    }

    return (
        <div className="min-h-svh w-full flex items-center justify-center p-6 md:p-10">
            <div className="max-w-md w-full">
                <div className="max-w-92 m-auto h-fit w-full">

                     <div className="p-6">
                        <div>
                            <h1 className="mb-1 mt-4 text-xl font-semibold">AuxoniaLMS</h1>
                            <p>If account exists, you will receive a verification email shortly.</p>
                        </div>
                    </div>

                    <div className="space-y-6 flex items-center justify-center">
                            <InputOTP
                                value={otp}
                                onChange={(value) => setOtp(value)}
                                maxLength={6}
                                className="gap-2"
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                                </InputOTP>
                    </div>

                    <div className="mt-6">
                        <Button
                            className="w-full"
                            onClick={verifyOtp}
                            disabled={otpPending || !otpIsFilled}
                        >
                            {otpPending?
                                <>
                                    <Loader className="size-4 animate-spin" />
                                    <span>Loading...</span>
                                </>
                                :
                                <>
                                    Verify
                                </>
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}