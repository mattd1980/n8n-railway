export declare function makeSerializable(error: Error): Error;
export declare abstract class SerializableError extends Error {
    constructor(message: string);
}
