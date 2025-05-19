import { UserError } from 'n8n-workflow';
export declare class InvalidSamlMetadataUrlError extends UserError {
    constructor(url: string);
}
