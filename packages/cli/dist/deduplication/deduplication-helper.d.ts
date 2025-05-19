import type { ICheckProcessedContextData, IDataDeduplicator, ICheckProcessedOptions, IDeduplicationOutput, DeduplicationScope, DeduplicationItemTypes } from 'n8n-workflow';
export declare class DeduplicationHelper implements IDataDeduplicator {
    private static sortEntries;
    private static compareValues;
    private static createContext;
    private static createValueHash;
    private findProcessedData;
    private validateMode;
    private processedDataHasEntries;
    private processedDataIsLatest;
    private handleLatestModes;
    private handleHashedItems;
    checkProcessedAndRecord(items: DeduplicationItemTypes[], scope: DeduplicationScope, contextData: ICheckProcessedContextData, options: ICheckProcessedOptions): Promise<IDeduplicationOutput>;
    removeProcessed(items: DeduplicationItemTypes[], scope: DeduplicationScope, contextData: ICheckProcessedContextData, options: ICheckProcessedOptions): Promise<void>;
    clearAllProcessedItems(scope: DeduplicationScope, contextData: ICheckProcessedContextData): Promise<void>;
    getProcessedDataCount(scope: DeduplicationScope, contextData: ICheckProcessedContextData, options: ICheckProcessedOptions): Promise<number>;
}
