import type { Response } from 'express';
import type { AuditRequest } from '../../../../public-api/types';
declare const _default: {
    generateAudit: (((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: Response, next: import("express").NextFunction) => Promise<Response | void>) | ((req: import("express").Request, res: Response, next: import("express").NextFunction) => Promise<void>) | ((req: AuditRequest.Generate, res: Response) => Promise<Response>))[];
};
export = _default;
