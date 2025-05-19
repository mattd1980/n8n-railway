import type { ShutdownHandler } from './types';
export declare class ShutdownRegistryMetadata {
    private handlersByPriority;
    register(priority: number, handler: ShutdownHandler): void;
    getHandlersByPriority(): ShutdownHandler[][];
    clear(): void;
}
