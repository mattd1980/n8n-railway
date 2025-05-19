import { GlobalConfig } from '@n8n/config';
import { CacheService } from '../../../services/cache/cache.service';
export declare class TaskBrokerAuthService {
    private readonly globalConfig;
    private readonly cacheService;
    private readonly grantTokenTtl;
    private readonly authToken;
    constructor(globalConfig: GlobalConfig, cacheService: CacheService, grantTokenTtl?: number);
    isValidAuthToken(token: string): boolean;
    createGrantToken(): Promise<string>;
    tryConsumeGrantToken(grantToken: string): Promise<boolean>;
    private generateGrantToken;
    private cacheKeyForGrantToken;
}
