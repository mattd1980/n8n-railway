import { WorkflowStatisticsRepository } from '@n8n/db';
import { Logger } from 'n8n-core';
import type { INode, IRun, IWorkflowBase } from 'n8n-workflow';
import { EventService } from '../events/event.service';
import { UserService } from '../services/user.service';
import { TypedEmitter } from '../typed-emitter';
import { OwnershipService } from './ownership.service';
type WorkflowStatisticsEvents = {
    nodeFetchedData: {
        workflowId: string;
        node: INode;
    };
    workflowExecutionCompleted: {
        workflowData: IWorkflowBase;
        fullRunData: IRun;
    };
    'telemetry.onFirstProductionWorkflowSuccess': {
        project_id: string;
        workflow_id: string;
        user_id: string;
    };
    'telemetry.onFirstWorkflowDataLoad': {
        user_id: string;
        project_id: string;
        workflow_id: string;
        node_type: string;
        node_id: string;
    };
};
export declare class WorkflowStatisticsService extends TypedEmitter<WorkflowStatisticsEvents> {
    private readonly logger;
    private readonly repository;
    private readonly ownershipService;
    private readonly userService;
    private readonly eventService;
    constructor(logger: Logger, repository: WorkflowStatisticsRepository, ownershipService: OwnershipService, userService: UserService, eventService: EventService);
    workflowExecutionCompleted(workflowData: IWorkflowBase, runData: IRun): Promise<void>;
    nodeFetchedData(workflowId: string | undefined | null, node: INode): Promise<void>;
}
export {};
