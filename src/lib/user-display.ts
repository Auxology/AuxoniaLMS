/**
 * Utility functions for user display logic
 */

export interface UserDisplayData {
    name?: string | null
    email: string
}

/**
 * Gets the display name for a user
 * Returns name if it exists, otherwise returns email
 */
export function getUserDisplayName(user: UserDisplayData): string {
    return user.name || user.email
}

/**
 * Gets the avatar fallback text for a user
 * Returns:
 * - First character of first name + first character of last name (if name has multiple words)
 * - First 2 characters of name (if name is single word)
 * - First character of email (if no name exists)
 */
export function getUserAvatarFallback(user: UserDisplayData): string {
    if (user.name) {
        const nameParts = user.name.trim().split(' ').filter(Boolean)

        if (nameParts.length > 1) {
            // First character of first name + first character of last name
            return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        } else if (nameParts.length === 1) {
            // First character of the single name
            return nameParts[0][0].toUpperCase()
        }
    }

    // Fallback to first character of email
    return user.email[0].toUpperCase()
}

/**
 * Gets both display name and avatar fallback
 */
export function getUserDisplayInfo(user: UserDisplayData) {
    return {
        displayName: getUserDisplayName(user),
        avatarFallback: getUserAvatarFallback(user),
    }
}
