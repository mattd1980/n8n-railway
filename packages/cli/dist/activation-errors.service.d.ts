import { CacheService } from './services/cache/cache.service';
export declare class ActivationErrorsService {
    private readonly cacheService;
    private readonly cacheKey;
    constructor(cacheService: CacheService);
    register(workflowId: string, errorMessage: string): Promise<void>;
    deregister(workflowId: string): Promise<void>;
    get(workflowId: string): Promise<string | null>;
    getAll(): Promise<import("./services/cache/cache.types").Hash<string>>;
    clearAll(): Promise<void>;
}
