import type express from 'express';
import type { WorkflowRequest } from '../../../types';
declare const _default: {
    createWorkflow: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>) | ((req: WorkflowRequest.Create, res: express.Response) => Promise<express.Response>))[];
    transferWorkflow: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
    deleteWorkflow: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
    getWorkflow: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
    getWorkflows: (((req: import("../../../types").PaginatedRequest, res: express.Response, next: express.NextFunction) => express.Response | void) | ((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>) | ((req: WorkflowRequest.GetAll, res: express.Response) => Promise<express.Response>))[];
    updateWorkflow: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
    activateWorkflow: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
    deactivateWorkflow: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
    getWorkflowTags: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
    updateWorkflowTags: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
};
export = _default;
