import type { ShutdownHandler } from '@n8n/decorators';
import { ShutdownRegistryMetadata } from '@n8n/decorators';
import { ErrorReporter, Logger } from 'n8n-core';
import { UnexpectedError } from 'n8n-workflow';
export declare class ComponentShutdownError extends UnexpectedError {
    constructor(componentName: string, cause: Error);
}
export declare class ShutdownService {
    private readonly logger;
    private readonly errorReporter;
    private readonly shutdownRegistry;
    private shutdownPromise;
    constructor(logger: Logger, errorReporter: ErrorReporter, shutdownRegistry: ShutdownRegistryMetadata);
    register(priority: number, handler: ShutdownHandler): void;
    validate(): void;
    shutdown(): void;
    waitForShutdown(): Promise<void>;
    isShuttingDown(): boolean;
    private startShutdown;
    private shutdownComponent;
}
