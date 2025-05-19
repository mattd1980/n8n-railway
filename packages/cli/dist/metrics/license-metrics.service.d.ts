import { LicenseMetricsRepository, WorkflowRepository } from '@n8n/db';
export declare class LicenseMetricsService {
    private readonly licenseMetricsRepository;
    private readonly workflowRepository;
    constructor(licenseMetricsRepository: LicenseMetricsRepository, workflowRepository: WorkflowRepository);
    collectUsageMetrics(): Promise<{
        name: string;
        value: number;
    }[]>;
    collectPassthroughData(): Promise<{
        activeWorkflowIds: string[];
    }>;
}
