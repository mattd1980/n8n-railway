import type { INodeExecutionData } from 'n8n-workflow';
import { ValidationError } from './errors/validation-error';
export declare const REQUIRED_N8N_ITEM_KEYS: Set<string>;
export declare class NonArrayOfObjectsError extends ValidationError {
    constructor();
}
export declare function validateRunForAllItemsOutput(executionResult: INodeExecutionData | INodeExecutionData[] | undefined): INodeExecutionData[];
export declare function validateRunForEachItemOutput(executionResult: INodeExecutionData | undefined, itemIndex: number): INodeExecutionData;
