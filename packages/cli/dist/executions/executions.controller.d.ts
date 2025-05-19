import { License } from '../license';
import { WorkflowSharingService } from '../workflows/workflow-sharing.service';
import { ExecutionService } from './execution.service';
import { EnterpriseExecutionsService } from './execution.service.ee';
import { ExecutionRequest } from './execution.types';
export declare class ExecutionsController {
    private readonly executionService;
    private readonly enterpriseExecutionService;
    private readonly workflowSharingService;
    private readonly license;
    constructor(executionService: ExecutionService, enterpriseExecutionService: EnterpriseExecutionsService, workflowSharingService: WorkflowSharingService, license: License);
    private getAccessibleWorkflowIds;
    getMany(req: ExecutionRequest.GetMany): Promise<{
        results: import("n8n-workflow").ExecutionSummary[];
        count: number;
        estimated: boolean;
    }>;
    getOne(req: ExecutionRequest.GetOne): Promise<import("@n8n/db").IExecutionResponse | import("../interfaces").IExecutionFlattedResponse | undefined>;
    stop(req: ExecutionRequest.Stop): Promise<import("./execution.types").StopResult>;
    retry(req: ExecutionRequest.Retry): Promise<"error" | "success" | "unknown" | "canceled" | "crashed" | "new" | "running" | "waiting">;
    delete(req: ExecutionRequest.Delete): Promise<void>;
    update(req: ExecutionRequest.Update): Promise<import("@n8n/db").IExecutionResponse | import("../interfaces").IExecutionFlattedResponse | undefined>;
}
