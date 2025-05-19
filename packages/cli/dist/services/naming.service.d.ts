import { CredentialsRepository, WorkflowRepository } from '@n8n/db';
export declare class NamingService {
    private readonly workflowRepository;
    private readonly credentialsRepository;
    constructor(workflowRepository: WorkflowRepository, credentialsRepository: CredentialsRepository);
    getUniqueWorkflowName(requestedName: string): Promise<string>;
    getUniqueCredentialName(requestedName: string): Promise<string>;
    private getUniqueName;
}
