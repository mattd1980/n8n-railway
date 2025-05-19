import { SecurityConfig } from '@n8n/config';
import { CredentialsRepository, ExecutionDataRepository, ExecutionRepository } from '@n8n/db';
import type { IWorkflowBase } from 'n8n-workflow';
import type { RiskReporter, Risk } from '../../security-audit/types';
export declare class CredentialsRiskReporter implements RiskReporter {
    private readonly credentialsRepository;
    private readonly executionRepository;
    private readonly executionDataRepository;
    private readonly securityConfig;
    constructor(credentialsRepository: CredentialsRepository, executionRepository: ExecutionRepository, executionDataRepository: ExecutionDataRepository, securityConfig: SecurityConfig);
    report(workflows: IWorkflowBase[]): Promise<Risk.StandardReport | null>;
    private getAllCredsInUse;
    private getAllExistingCreds;
    private getExecutedWorkflowsInPastDays;
    private getCredsInRecentlyExecutedWorkflows;
}
