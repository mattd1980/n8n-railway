import { BaseEntity } from '@n8n/typeorm';
export declare class InsightsMetadata extends BaseEntity {
    metaId: number;
    workflowId: string;
    projectId: string;
    workflowName: string;
    projectName: string;
}
