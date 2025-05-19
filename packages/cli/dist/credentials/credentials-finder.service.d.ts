import type { CredentialsEntity, SharedCredentials, User } from '@n8n/db';
import { CredentialsRepository, SharedCredentialsRepository } from '@n8n/db';
import type { CredentialSharingRole, ProjectRole, Scope } from '@n8n/permissions';
import type { EntityManager } from '@n8n/typeorm';
export declare class CredentialsFinderService {
    private readonly sharedCredentialsRepository;
    private readonly credentialsRepository;
    constructor(sharedCredentialsRepository: SharedCredentialsRepository, credentialsRepository: CredentialsRepository);
    findCredentialsForUser(user: User, scopes: Scope[]): Promise<CredentialsEntity[]>;
    findCredentialForUser(credentialsId: string, user: User, scopes: Scope[]): Promise<CredentialsEntity | null>;
    findAllCredentialsForUser(user: User, scopes: Scope[], trx?: EntityManager): Promise<{
        projectId: string;
        name: string;
        data: string;
        type: string;
        shared: SharedCredentials[];
        isManaged: boolean;
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }[]>;
    getCredentialIdsByUserAndRole(userIds: string[], options: {
        scopes: Scope[];
    } | {
        projectRoles: ProjectRole[];
        credentialRoles: CredentialSharingRole[];
    }, trx?: EntityManager): Promise<string[]>;
}
