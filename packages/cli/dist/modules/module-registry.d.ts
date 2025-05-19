import { LifecycleMetadata, ModuleMetadata } from '@n8n/decorators';
import type { ExecutionLifecycleHooks } from 'n8n-core';
export declare class ModuleRegistry {
    private readonly moduleMetadata;
    private readonly lifecycleMetadata;
    constructor(moduleMetadata: ModuleMetadata, lifecycleMetadata: LifecycleMetadata);
    initializeModules(): Promise<void>;
    registerLifecycleHooks(hooks: ExecutionLifecycleHooks): void;
}
