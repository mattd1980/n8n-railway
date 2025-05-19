import { TypedEmitter } from '../typed-emitter';
type ConcurrencyEvents = {
    'execution-throttled': {
        executionId: string;
    };
    'execution-released': string;
    'concurrency-check': {
        capacity: number;
    };
};
export declare class ConcurrencyQueue extends TypedEmitter<ConcurrencyEvents> {
    private capacity;
    private readonly queue;
    constructor(capacity: number);
    enqueue(executionId: string): Promise<void>;
    get currentCapacity(): number;
    dequeue(): void;
    remove(executionId: string): void;
    getAll(): Set<string>;
    has(executionId: string): boolean;
    private resolveNext;
}
export {};
