import { GlobalConfig } from '@n8n/config';
import { Logger } from 'n8n-core';
export declare class DeprecationService {
    private readonly logger;
    private readonly globalConfig;
    private readonly deprecations;
    private readonly state;
    constructor(logger: Logger, globalConfig: GlobalConfig);
    warn(): void;
}
