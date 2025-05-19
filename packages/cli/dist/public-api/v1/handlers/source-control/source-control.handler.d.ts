import type express from 'express';
import type { StatusResult } from 'simple-git';
import type { ImportResult } from '../../../../environments.ee/source-control/types/import-result';
import type { AuthenticatedRequest } from '../../../../requests';
declare const _default: {
    pull: (((req: AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>) | ((req: AuthenticatedRequest, res: express.Response) => Promise<ImportResult | StatusResult | Promise<express.Response>>))[];
};
export = _default;
