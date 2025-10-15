'use client'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export function useLogout() {
    const router = useRouter()

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/')
                    toast.success('Logged out successfully!')
                },
                onError: () => {
                    toast.error('Error logging out. Please try again.')
                },
            },
        })
    }

    return handleLogout
}
