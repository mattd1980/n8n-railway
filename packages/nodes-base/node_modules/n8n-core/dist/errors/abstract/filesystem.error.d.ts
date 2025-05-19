import { ApplicationError } from 'n8n-workflow';
export declare abstract class FileSystemError extends ApplicationError {
    constructor(message: string, filePath: string);
}
