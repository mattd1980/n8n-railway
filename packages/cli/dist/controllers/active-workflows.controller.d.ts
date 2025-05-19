import { ActiveWorkflowRequest } from '../requests';
import { ActiveWorkflowsService } from '../services/active-workflows.service';
export declare class ActiveWorkflowsController {
    private readonly activeWorkflowsService;
    constructor(activeWorkflowsService: ActiveWorkflowsService);
    getActiveWorkflows(req: ActiveWorkflowRequest.GetAllActive): Promise<string[]>;
    getActivationError(req: ActiveWorkflowRequest.GetActivationError): Promise<string | null>;
}
