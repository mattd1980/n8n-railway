import type { User } from '@n8n/db';
export declare const handleLdapLogin: (loginId: string, password: string) => Promise<User | undefined>;
