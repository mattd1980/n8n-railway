import type { BooleanLicenseFeature } from '@n8n/constants';
import type { Constructable } from '@n8n/di';
import type { Scope } from '@n8n/permissions';
import type { RequestHandler } from 'express';
export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type Arg = {
    type: 'body' | 'query';
} | {
    type: 'param';
    key: string;
};
export interface RateLimit {
    limit?: number;
    windowMs?: number;
}
export type HandlerName = string;
export interface AccessScope {
    scope: Scope;
    globalOnly: boolean;
}
export interface RouteMetadata {
    method: Method;
    path: string;
    middlewares: RequestHandler[];
    usesTemplates: boolean;
    skipAuth: boolean;
    rateLimit?: boolean | RateLimit;
    licenseFeature?: BooleanLicenseFeature;
    accessScope?: AccessScope;
    args: Arg[];
}
export interface ControllerMetadata {
    basePath: `/${string}`;
    middlewares: HandlerName[];
    routes: Map<HandlerName, RouteMetadata>;
}
export type Controller = Constructable<object> & Record<HandlerName, (...args: unknown[]) => Promise<unknown>>;
