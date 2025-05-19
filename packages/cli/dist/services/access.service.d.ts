import type { User } from '@n8n/db';
import { UserRepository } from '@n8n/db';
import type { Workflow } from 'n8n-workflow';
import { WorkflowFinderService } from '../workflows/workflow-finder.service';
export declare class AccessService {
    private readonly userRepository;
    private readonly workflowFinderService;
    constructor(userRepository: UserRepository, workflowFinderService: WorkflowFinderService);
    hasReadAccess(userId: User['id'], workflowId: Workflow['id']): Promise<boolean>;
}
