import type express from 'express';
import type { ExecutionRequest } from '../../../types';
declare const _default: {
    deleteExecution: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>) | ((req: ExecutionRequest.Delete, res: express.Response) => Promise<express.Response>))[];
    getExecution: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>) | ((req: ExecutionRequest.Get, res: express.Response) => Promise<express.Response>))[];
    getExecutions: (((req: import("../../../types").PaginatedRequest, res: express.Response, next: express.NextFunction) => express.Response | void) | ((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>) | ((req: ExecutionRequest.GetAll, res: express.Response) => Promise<express.Response>))[];
};
export = _default;
