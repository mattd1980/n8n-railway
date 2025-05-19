import type { User } from '@n8n/db';
import { SharedCredentials, SharedCredentialsRepository } from '@n8n/db';
import { type EntityManager } from '@n8n/typeorm';
import type { ICredentialDataDecryptedObject } from 'n8n-workflow';
import { OwnershipService } from '../services/ownership.service';
import { ProjectService } from '../services/project.service.ee';
import { CredentialsFinderService } from './credentials-finder.service';
import { CredentialsService } from './credentials.service';
export declare class EnterpriseCredentialsService {
    private readonly sharedCredentialsRepository;
    private readonly ownershipService;
    private readonly credentialsService;
    private readonly projectService;
    private readonly credentialsFinderService;
    constructor(sharedCredentialsRepository: SharedCredentialsRepository, ownershipService: OwnershipService, credentialsService: CredentialsService, projectService: ProjectService, credentialsFinderService: CredentialsFinderService);
    shareWithProjects(user: User, credentialId: string, shareWithIds: string[], entityManager?: EntityManager): Promise<SharedCredentials[]>;
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
    transferOne(user: User, credentialId: string, destinationProjectId: string): Promise<void>;
}
