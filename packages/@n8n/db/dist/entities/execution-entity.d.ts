import { Relation } from '@n8n/typeorm';
import { ExecutionStatus, WorkflowExecuteMode } from 'n8n-workflow';
import type { ExecutionAnnotation } from './execution-annotation.ee';
import type { ExecutionData } from './execution-data';
import type { ExecutionMetadata } from './execution-metadata';
import { WorkflowEntity } from './workflow-entity';
export declare class ExecutionEntity {
    id: string;
    finished: boolean;
    mode: WorkflowExecuteMode;
    retryOf: string;
    retrySuccessId: string;
    status: ExecutionStatus;
    createdAt: Date;
    startedAt: Date | null;
    stoppedAt: Date;
    deletedAt: Date;
    workflowId: string;
    waitTill: Date | null;
    metadata: ExecutionMetadata[];
    executionData: Relation<ExecutionData>;
    annotation?: Relation<ExecutionAnnotation>;
    workflow: WorkflowEntity;
}
