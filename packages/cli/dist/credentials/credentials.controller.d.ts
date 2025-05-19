import { CreateCredentialDto, CredentialsGetManyRequestQuery, CredentialsGetOneRequestQuery, GenerateCredentialNameRequestQuery } from '@n8n/api-types';
import { GlobalConfig } from '@n8n/config';
import { ProjectRelationRepository, SharedCredentialsRepository } from '@n8n/db';
import { Logger } from 'n8n-core';
import { EventService } from '../events/event.service';
import { License } from '../license';
import { AuthenticatedRequest, CredentialRequest } from '../requests';
import { NamingService } from '../services/naming.service';
import { UserManagementMailer } from '../user-management/email';
import { CredentialsFinderService } from './credentials-finder.service';
import { CredentialsService } from './credentials.service';
import { EnterpriseCredentialsService } from './credentials.service.ee';
export declare class CredentialsController {
    private readonly globalConfig;
    private readonly credentialsService;
    private readonly enterpriseCredentialsService;
    private readonly namingService;
    private readonly license;
    private readonly logger;
    private readonly userManagementMailer;
    private readonly sharedCredentialsRepository;
    private readonly projectRelationRepository;
    private readonly eventService;
    private readonly credentialsFinderService;
    constructor(globalConfig: GlobalConfig, credentialsService: CredentialsService, enterpriseCredentialsService: EnterpriseCredentialsService, namingService: NamingService, license: License, logger: Logger, userManagementMailer: UserManagementMailer, sharedCredentialsRepository: SharedCredentialsRepository, projectRelationRepository: ProjectRelationRepository, eventService: EventService, credentialsFinderService: CredentialsFinderService);
    getMany(req: CredentialRequest.GetMany, _res: unknown, query: CredentialsGetManyRequestQuery): Promise<import("@n8n/db").CredentialsEntity[]>;
    getProjectCredentials(req: CredentialRequest.ForWorkflow): Promise<{
        id: string;
        name: string;
        type: string;
        scopes: import("@n8n/permissions").Scope[];
        isManaged: boolean;
    }[]>;
    generateUniqueName(_req: unknown, _res: unknown, query: GenerateCredentialNameRequestQuery): Promise<{
        name: string;
    }>;
    getOne(req: CredentialRequest.Get, _res: unknown, credentialId: string, query: CredentialsGetOneRequestQuery): Promise<{
        scopes: import("@n8n/permissions").Scope[];
        name: string;
        type: string;
        isManaged: boolean;
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }>;
    testCredentials(req: CredentialRequest.Test): Promise<import("n8n-workflow").INodeCredentialTestResult>;
    createCredentials(req: AuthenticatedRequest, _: Response, payload: CreateCredentialDto): Promise<{
        scopes: import("@n8n/permissions").Scope[];
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
    updateCredentials(req: CredentialRequest.Update): Promise<{
        scopes: import("@n8n/permissions").Scope[];
        name: string;
        type: string;
        isManaged: boolean;
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }>;
    deleteCredentials(req: CredentialRequest.Delete): Promise<boolean>;
    shareCredentials(req: CredentialRequest.Share): Promise<void>;
    transfer(req: CredentialRequest.Transfer): Promise<void>;
}
