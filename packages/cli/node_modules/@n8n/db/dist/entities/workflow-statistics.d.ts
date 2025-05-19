import { StatisticsNames } from './types-db';
import { WorkflowEntity } from './workflow-entity';
export declare class WorkflowStatistics {
    count: number;
    rootCount: number;
    latestEvent: Date;
    name: StatisticsNames;
    workflow: WorkflowEntity;
    workflowId: string;
}
