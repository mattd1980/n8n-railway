import type { ICredentialTestFunctions } from 'n8n-workflow';
import { Logger } from '../../logging';
export declare class CredentialTestContext implements ICredentialTestFunctions {
    readonly helpers: ICredentialTestFunctions['helpers'];
    constructor();
    get logger(): Logger;
}
