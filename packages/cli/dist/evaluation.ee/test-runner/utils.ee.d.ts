import type { MockedNodeItem } from '@n8n/db';
import type { IRunExecutionData, IPinData, IWorkflowBase, IRunData } from 'n8n-workflow';
import type { TestCaseRunMetadata } from '../../evaluation.ee/test-runner/test-runner.service.ee';
export declare function createPinData(workflow: IWorkflowBase, mockedNodes: MockedNodeItem[], executionData: IRunExecutionData, pastWorkflowData?: IWorkflowBase): IPinData;
export declare function getPastExecutionTriggerNode(executionData: IRunExecutionData): string | undefined;
export declare function formatTestCaseExecutionInputData(originalExecutionData: IRunData, _originalWorkflowData: IWorkflowBase, newExecutionData: IRunData, _newWorkflowData: IWorkflowBase, metadata: TestCaseRunMetadata): {
    json: {
        annotations: {
            vote: import("n8n-workflow").AnnotationVote | null | undefined;
            tags: Pick<import("@n8n/db").AnnotationTagEntity, "id" | "name">[] | undefined;
            highlightedData: {
                [k: string]: string;
            };
        };
        originalExecution: Record<string, any>;
        newExecution: Record<string, any>;
    };
};
