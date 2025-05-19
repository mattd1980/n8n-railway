import { CreateApiKeyRequestDto, UpdateApiKeyRequestDto } from '@n8n/api-types';
import type { RequestHandler } from 'express';
import { EventService } from '../events/event.service';
import { AuthenticatedRequest } from '../requests';
import { PublicApiKeyService } from '../services/public-api-key.service';
export declare const isApiEnabledMiddleware: RequestHandler;
export declare class ApiKeysController {
    private readonly eventService;
    private readonly publicApiKeyService;
    constructor(eventService: EventService, publicApiKeyService: PublicApiKeyService);
    createApiKey(req: AuthenticatedRequest, _res: Response, body: CreateApiKeyRequestDto): Promise<{
        apiKey: string;
        rawApiKey: string;
        expiresAt: number | null;
        user: import("@n8n/db").User;
        userId: string;
        label: string;
        scopes: import("@n8n/permissions").ApiKeyScope[];
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }>;
    getApiKeys(req: AuthenticatedRequest): Promise<{
        apiKey: string;
        expiresAt: number | null;
        user: import("@n8n/db").User;
        userId: string;
        label: string;
        scopes: import("@n8n/permissions").ApiKeyScope[];
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }[]>;
    deleteApiKey(req: AuthenticatedRequest, _res: Response, apiKeyId: string): Promise<{
        success: boolean;
    }>;
    updateApiKey(req: AuthenticatedRequest, _res: Response, apiKeyId: string, body: UpdateApiKeyRequestDto): Promise<{
        success: boolean;
    }>;
    getApiKeyScopes(req: AuthenticatedRequest, _res: Response): Promise<import("@n8n/permissions").ApiKeyScope[]>;
}
