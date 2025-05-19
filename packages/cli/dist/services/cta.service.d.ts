import type { User } from '@n8n/db';
import { WorkflowStatisticsRepository } from '@n8n/db';
export declare class CtaService {
    private readonly workflowStatisticsRepository;
    constructor(workflowStatisticsRepository: WorkflowStatisticsRepository);
    getBecomeCreatorCta(userId: User['id']): Promise<boolean>;
}
