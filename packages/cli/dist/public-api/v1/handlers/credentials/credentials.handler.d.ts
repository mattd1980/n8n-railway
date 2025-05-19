import type { CredentialsEntity } from '@n8n/db';
import type express from 'express';
import type { CredentialTypeRequest, CredentialRequest } from '../../../types';
declare const _default: {
    createCredential: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>) | ((req: CredentialRequest.Create, res: express.Response, next: express.NextFunction) => express.Response | void) | ((req: CredentialRequest.Create, res: express.Response) => Promise<express.Response<Partial<CredentialsEntity>>>))[];
    transferCredential: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
    deleteCredential: (((_req: Request, _res: Response, next: express.NextFunction) => void) | ((req: import("../../../../requests").AuthenticatedRequest<{
        id?: string;
    }>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
    getCredentialType: ((req: CredentialTypeRequest.Get, res: express.Response) => Promise<express.Response>)[];
};
export = _default;
