import { WithTimestamps } from './abstract-entity';
import { AuthProviderType } from './types-db';
import { User } from './user';
export declare class AuthIdentity extends WithTimestamps {
    userId: string;
    user: User;
    providerId: string;
    providerType: AuthProviderType;
    static create(user: User, providerId: string, providerType?: AuthProviderType): AuthIdentity;
}
