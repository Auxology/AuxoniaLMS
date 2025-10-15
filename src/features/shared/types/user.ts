/**
 * Shared user-related types across features
 */

export type User = {
  id: string;
  name?: string | null;
  email: string;
  stripeCustomerId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserDisplayData = {
  name?: string | null;
  email: string;
};

export type UserSession = {
  user: User;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
};

/**
 * User role types
 */
export type UserRole = 'admin' | 'user';

export type UserWithRole = User & {
  role: UserRole;
};

/**
 * User permissions
 */
export type UserPermission = 
  | 'course:create'
  | 'course:read'
  | 'course:update'
  | 'course:delete'
  | 'enrollment:create'
  | 'enrollment:read'
  | 'admin:access';

export type UserWithPermissions = User & {
  permissions: UserPermission[];
};
