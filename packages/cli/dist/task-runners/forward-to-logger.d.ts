import type { Logger } from 'n8n-workflow';
import type { Readable } from 'stream';
export declare function forwardToLogger(logger: Logger, producer: {
    stdout?: Readable | null;
    stderr?: Readable | null;
}, prefix?: string): void;
