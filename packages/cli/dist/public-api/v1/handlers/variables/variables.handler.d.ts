import type { Response } from 'express';
import type { PaginatedRequest } from '../../../../public-api/types';
declare const _default: {
    createVariable: (((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: Response, next: import("express").NextFunction) => Promise<Response | void>) | ((req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>))[];
    updateVariable: (((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: Response, next: import("express").NextFunction) => Promise<Response | void>) | ((req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>))[];
    deleteVariable: (((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: Response, next: import("express").NextFunction) => Promise<Response | void>) | ((req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>))[];
    getVariables: (((req: PaginatedRequest, res: Response, next: import("express").NextFunction) => Response | void) | ((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: Response, next: import("express").NextFunction) => Promise<Response | void>) | ((req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>))[];
};
export = _default;
