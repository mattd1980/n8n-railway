import { GlobalConfig } from '@n8n/config';
import { DataSource, Repository } from '@n8n/typeorm';
export declare class LicenseMetrics {
}
export declare class LicenseMetricsRepository extends Repository<LicenseMetrics> {
    private readonly globalConfig;
    constructor(dataSource: DataSource, globalConfig: GlobalConfig);
    toTableName(name: string): string;
    toColumnName(name: string): string;
    getLicenseRenewalMetrics(): Promise<{
        enabledUsers: number;
        totalUsers: number;
        activeWorkflows: number;
        totalWorkflows: number;
        totalCredentials: number;
        productionExecutions: number;
        productionRootExecutions: number;
        manualExecutions: number;
    }>;
}
