import type { ApiKeyScope } from '@n8n/permissions';
export type UnixTimestamp = number | null;
export type ApiKey = {
    id: string;
    label: string;
    apiKey: string;
    createdAt: string;
    updatedAt: string;
    expiresAt: UnixTimestamp | null;
    scopes: ApiKeyScope[];
};
export type ApiKeyWithRawValue = ApiKey & {
    rawApiKey: string;
};
