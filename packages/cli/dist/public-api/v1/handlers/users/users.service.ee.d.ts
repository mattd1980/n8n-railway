import type { User } from '@n8n/db';
export declare function getUser(data: {
    withIdentifier: string;
    includeRole?: boolean;
}): Promise<User | null>;
export declare function getAllUsersAndCount(data: {
    includeRole?: boolean;
    limit?: number;
    offset?: number;
    in?: string[];
}): Promise<[User[], number]>;
export declare function clean(user: User, options?: {
    includeRole: boolean;
}): Partial<User>;
export declare function clean(users: User[], options?: {
    includeRole: boolean;
}): Array<Partial<User>>;
