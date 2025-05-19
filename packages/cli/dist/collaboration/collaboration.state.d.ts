import type { User } from '@n8n/db';
import type { Workflow } from 'n8n-workflow';
import { CacheService } from '../services/cache/cache.service';
interface CacheEntry {
    userId: string;
    lastSeen: string;
}
export declare class CollaborationState {
    private readonly cache;
    readonly inactivityCleanUpTime: number;
    constructor(cache: CacheService);
    addCollaborator(workflowId: Workflow['id'], userId: User['id']): Promise<void>;
    removeCollaborator(workflowId: Workflow['id'], userId: User['id']): Promise<void>;
    getCollaborators(workflowId: Workflow['id']): Promise<CacheEntry[]>;
    private formWorkflowCacheKey;
    private splitToExpiredAndStillActive;
    private removeExpiredCollaborators;
    private cacheHashToCollaborators;
    private hasSessionExpired;
}
export {};
