import { PaginationDto } from '@n8n/api-types';
import { Request, Response, NextFunction } from 'express';
import { WorkflowHistoryRequest } from '../../requests';
import { WorkflowHistoryService } from './workflow-history.service.ee';
export declare class WorkflowHistoryController {
    private readonly historyService;
    constructor(historyService: WorkflowHistoryService);
    workflowHistoryLicense(_req: Request, res: Response, next: NextFunction): void;
    workflowHistoryEnabled(_req: Request, res: Response, next: NextFunction): void;
    getList(req: WorkflowHistoryRequest.GetList, _res: Response, query: PaginationDto): Promise<Omit<import("@n8n/db").WorkflowHistory, "nodes" | "connections">[]>;
    getVersion(req: WorkflowHistoryRequest.GetVersion): Promise<import("@n8n/db").WorkflowHistory>;
}
