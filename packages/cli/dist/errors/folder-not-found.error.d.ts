import { OperationalError } from 'n8n-workflow';
export declare class FolderNotFoundError extends OperationalError {
    constructor(folderId: string);
}
