import type { User } from '@n8n/db';
export declare const handleEmailLogin: (email: string, password: string) => Promise<User | undefined>;
