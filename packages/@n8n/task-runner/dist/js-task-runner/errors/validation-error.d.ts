import { SerializableError } from './serializable-error';
export declare class ValidationError extends SerializableError {
    description: string;
    itemIndex: number | undefined;
    context: {
        itemIndex: number;
    } | undefined;
    lineNumber: number | undefined;
    constructor({ message, description, itemIndex, lineNumber, }: {
        message: string;
        description: string;
        itemIndex?: number;
        lineNumber?: number;
    });
}
