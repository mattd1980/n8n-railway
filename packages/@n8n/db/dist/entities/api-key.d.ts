import type { ApiKeyScope } from '@n8n/permissions';
import { WithTimestampsAndStringId } from './abstract-entity';
import { User } from './user';
export declare class ApiKey extends WithTimestampsAndStringId {
    user: User;
    userId: string;
    label: string;
    scopes: ApiKeyScope[];
    apiKey: string;
}
