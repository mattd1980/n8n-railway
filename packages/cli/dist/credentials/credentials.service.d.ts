import type { CreateCredentialDto } from '@n8n/api-types';
import type { User, ICredentialsDb } from '@n8n/db';
import { CredentialsEntity, SharedCredentials, CredentialsRepository, ProjectRepository, SharedCredentialsRepository, UserRepository } from '@n8n/db';
import { type Scope } from '@n8n/permissions';
import { type EntityManager, type FindOptionsRelations } from '@n8n/typeorm';
import { ErrorReporter, Logger } from 'n8n-core';
import type { ICredentialDataDecryptedObject, ICredentialsDecrypted } from 'n8n-workflow';
import { CredentialTypes } from '../credential-types';
import { ExternalHooks } from '../external-hooks';
import type { CredentialRequest, ListQuery } from '../requests';
import { CredentialsTester } from '../services/credentials-tester.service';
import { OwnershipService } from '../services/ownership.service';
import { ProjectService } from '../services/project.service.ee';
import { RoleService } from '../services/role.service';
import { CredentialsFinderService } from './credentials-finder.service';
export type CredentialsGetSharedOptions = {
    allowGlobalScope: true;
    globalScope: Scope;
} | {
    allowGlobalScope: false;
};
export declare class CredentialsService {
    private readonly credentialsRepository;
    private readonly sharedCredentialsRepository;
    private readonly ownershipService;
    private readonly logger;
    private readonly errorReporter;
    private readonly credentialsTester;
    private readonly externalHooks;
    private readonly credentialTypes;
    private readonly projectRepository;
    private readonly projectService;
    private readonly roleService;
    private readonly userRepository;
    private readonly credentialsFinderService;
    constructor(credentialsRepository: CredentialsRepository, sharedCredentialsRepository: SharedCredentialsRepository, ownershipService: OwnershipService, logger: Logger, errorReporter: ErrorReporter, credentialsTester: CredentialsTester, externalHooks: ExternalHooks, credentialTypes: CredentialTypes, projectRepository: ProjectRepository, projectService: ProjectService, roleService: RoleService, userRepository: UserRepository, credentialsFinderService: CredentialsFinderService);
    getMany(user: User, { listQueryOptions, includeScopes, includeData, onlySharedWithMe, }?: {
        listQueryOptions?: ListQuery.Options & {
            includeData?: boolean;
        };
        includeScopes?: boolean;
        includeData?: boolean;
        onlySharedWithMe?: boolean;
    }): Promise<CredentialsEntity[]>;
    getCredentialsAUserCanUseInAWorkflow(user: User, options: {
        workflowId: string;
    } | {
        projectId: string;
    }): Promise<{
        id: string;
        name: string;
        type: string;
        scopes: Scope[];
        isManaged: boolean;
    }[]>;
    findAllCredentialIdsForWorkflow(workflowId: string): Promise<CredentialsEntity[]>;
    findAllCredentialIdsForProject(projectId: string): Promise<CredentialsEntity[]>;
    getSharing(user: User, credentialId: string, globalScopes: Scope[], relations?: FindOptionsRelations<SharedCredentials>): Promise<SharedCredentials | null>;
    prepareUpdateData(data: CredentialRequest.CredentialProperties, decryptedData: ICredentialDataDecryptedObject): Promise<CredentialsEntity>;
    createEncryptedData(credential: {
        id: string | null;
        name: string;
        type: string;
        data: ICredentialDataDecryptedObject;
    }): ICredentialsDb;
    decrypt(credential: CredentialsEntity, includeRawData?: boolean): ICredentialDataDecryptedObject;
    update(credentialId: string, newCredentialData: ICredentialsDb): Promise<CredentialsEntity | null>;
    save(credential: CredentialsEntity, encryptedData: ICredentialsDb, user: User, projectId?: string): Promise<CredentialsEntity>;
    delete(user: User, credentialId: string): Promise<void>;
    test(userId: User['id'], credentials: ICredentialsDecrypted): Promise<import("n8n-workflow").INodeCredentialTestResult>;
    redact(data: ICredentialDataDecryptedObject, credential: CredentialsEntity): ICredentialDataDecryptedObject;
    private unredactRestoreValues;
    unredact(redactedData: ICredentialDataDecryptedObject, savedData: ICredentialDataDecryptedObject): ICredentialDataDecryptedObject;
    getOne(user: User, credentialId: string, includeDecryptedData: boolean): Promise<{
        name: string;
        type: string;
        shared: SharedCredentials[];
        isManaged: boolean;
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
        data: ICredentialDataDecryptedObject;
    } | {
        name: string;
        type: string;
        shared: SharedCredentials[];
        isManaged: boolean;
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }>;
    getCredentialScopes(user: User, credentialId: string): Promise<Scope[]>;
    transferAll(fromProjectId: string, toProjectId: string, trx?: EntityManager): Promise<void>;
    replaceCredentialContentsForSharee(user: User, credential: CredentialsEntity, decryptedData: ICredentialDataDecryptedObject, mergedCredentials: ICredentialsDecrypted): Promise<void>;
    createUnmanagedCredential(dto: CreateCredentialDto, user: User): Promise<{
        scopes: Scope[];
        name: string;
        data: string;
        type: string;
        isManaged: boolean;
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }>;
    createManagedCredential(dto: CreateCredentialDto, user: User): Promise<{
        scopes: Scope[];
        name: string;
        data: string;
        type: string;
        isManaged: boolean;
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }>;
    private createCredential;
}
