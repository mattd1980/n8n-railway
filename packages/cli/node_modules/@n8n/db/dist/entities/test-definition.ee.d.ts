import { WithTimestampsAndStringId } from './abstract-entity';
import { AnnotationTagEntity } from './annotation-tag-entity.ee';
import type { TestMetric } from './test-metric.ee';
import type { MockedNodeItem } from './types-db';
import { WorkflowEntity } from './workflow-entity';
export declare class TestDefinition extends WithTimestampsAndStringId {
    name: string;
    description: string;
    mockedNodes: MockedNodeItem[];
    workflow: WorkflowEntity;
    workflowId: string;
    evaluationWorkflow: WorkflowEntity;
    evaluationWorkflowId: string;
    annotationTag: AnnotationTagEntity;
    annotationTagId: string;
    metrics: TestMetric[];
}
