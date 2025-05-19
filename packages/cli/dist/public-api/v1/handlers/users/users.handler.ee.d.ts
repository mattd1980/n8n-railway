import { InviteUsersRequestDto } from '@n8n/api-types';
import type express from 'express';
import type { Response } from 'express';
import type { AuthenticatedRequest } from '../../../../requests';
type Create = AuthenticatedRequest<{}, {}, InviteUsersRequestDto>;
declare const _default: {
    getUser: (((_: express.Request, res: express.Response, next: express.NextFunction) => express.Response | void) | ((req: AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: Response, next: express.NextFunction) => Promise<void>))[];
    getUsers: (((req: import("../../../types").PaginatedRequest, res: express.Response, next: express.NextFunction) => express.Response | void) | ((_: express.Request, res: express.Response, next: express.NextFunction) => express.Response | void) | ((req: AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: Response, next: express.NextFunction) => Promise<void>))[];
    createUser: (((req: AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: Response, next: express.NextFunction) => Promise<void>) | ((req: Create, res: Response) => Promise<express.Response<any, Record<string, any>>>))[];
    deleteUser: (((req: AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: Response, next: express.NextFunction) => Promise<void>))[];
    changeRole: (((req: AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: Response, next: express.NextFunction) => Promise<void>))[];
};
export = _default;
