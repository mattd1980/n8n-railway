import type { IProcessedDataEntries, IProcessedDataLatest } from 'n8n-workflow';
import { WithTimestamps } from './abstract-entity';
export declare class ProcessedData extends WithTimestamps {
    context: string;
    workflowId: string;
    value: IProcessedDataEntries | IProcessedDataLatest;
}
