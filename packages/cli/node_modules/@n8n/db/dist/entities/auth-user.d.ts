import { User } from './user';
export declare class AuthUser extends User {
    mfaSecret?: string | null;
    mfaRecoveryCodes: string[];
}
