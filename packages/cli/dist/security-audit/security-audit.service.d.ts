import { SecurityConfig } from '@n8n/config';
import { WorkflowRepository } from '@n8n/db';
import type { Risk } from '../security-audit/types';
export declare class SecurityAuditService {
    private readonly workflowRepository;
    private readonly securityConfig;
    constructor(workflowRepository: WorkflowRepository, securityConfig: SecurityConfig);
    private reporters;
    run(categories?: Risk.Category[], daysAbandonedWorkflow?: number): Promise<never[] | Risk.Audit>;
    initReporters(categories: Risk.Category[]): Promise<void>;
}
