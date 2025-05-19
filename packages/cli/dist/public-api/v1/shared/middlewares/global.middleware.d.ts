import type { BooleanLicenseFeature } from '@n8n/constants';
import type { ApiKeyScope, Scope } from '@n8n/permissions';
import type express from 'express';
import type { NextFunction } from 'express';
import type { AuthenticatedRequest } from '../../../../requests';
import type { PaginatedRequest } from '../../../types';
export type ProjectScopeResource = 'workflow' | 'credential';
export declare const globalScope: (scopes: Scope | Scope[]) => (req: AuthenticatedRequest<{
    id?: string;
}>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>;
export declare const projectScope: (scopes: Scope | Scope[], resource: ProjectScopeResource) => (req: AuthenticatedRequest<{
    id?: string;
}>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>;
export declare const validCursor: (req: PaginatedRequest, res: express.Response, next: express.NextFunction) => express.Response | void;
export declare const apiKeyHasScope: (apiKeyScope: ApiKeyScope) => ((_req: Request, _res: Response, next: NextFunction) => void) | ((req: express.Request, res: express.Response, next: NextFunction) => Promise<void>);
export declare const apiKeyHasScopeWithGlobalScopeFallback: (config: {
    scope: ApiKeyScope & Scope;
} | {
    apiKeyScope: ApiKeyScope;
    globalScope: Scope;
}) => ((req: AuthenticatedRequest<{
    id?: string;
}>, res: express.Response, next: express.NextFunction) => Promise<express.Response | void>) | ((req: express.Request, res: express.Response, next: NextFunction) => Promise<void>);
export declare const validLicenseWithUserQuota: (_: express.Request, res: express.Response, next: express.NextFunction) => express.Response | void;
export declare const isLicensed: (feature: BooleanLicenseFeature) => (_: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => Promise<void | express.Response<any, Record<string, any>>>;
