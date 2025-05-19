import type { ErrorLike } from './error-like';
import { SerializableError } from './serializable-error';
export declare class ExecutionError extends SerializableError {
    description: string | null;
    itemIndex: number | undefined;
    context: {
        itemIndex: number;
    } | undefined;
    lineNumber: number | undefined;
    constructor(error: ErrorLike, itemIndex?: number);
    private populateFromStack;
    private toLineNumberDisplay;
    private toErrorDetailsAndType;
}
