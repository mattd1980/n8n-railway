export interface ErrorLike {
    message: string;
    stack?: string;
}
export declare function isErrorLike(value: unknown): value is ErrorLike;
