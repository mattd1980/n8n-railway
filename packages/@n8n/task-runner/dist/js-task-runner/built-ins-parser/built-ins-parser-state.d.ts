import type { BrokerMessage } from '../../message-types';
import type { InputDataChunkDefinition } from '../../runner-types';
export declare class BuiltInsParserState {
    neededNodeNames: Set<string>;
    needsAllNodes: boolean;
    needs$env: boolean;
    needs$input: boolean;
    needs$execution: boolean;
    needs$prevNode: boolean;
    constructor(opts?: Partial<BuiltInsParserState>);
    markNeedsAllNodes(): void;
    markNodeAsNeeded(nodeName: string): void;
    markEnvAsNeeded(): void;
    markInputAsNeeded(): void;
    markExecutionAsNeeded(): void;
    markPrevNodeAsNeeded(): void;
    toDataRequestParams(chunk?: InputDataChunkDefinition): BrokerMessage.ToRequester.TaskDataRequest['requestParams'];
    static newNeedsAllDataState(): BuiltInsParserState;
}
