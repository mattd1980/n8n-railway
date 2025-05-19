import type { DataRequestResponse, BrokerMessage } from '@n8n/task-runner';
export declare class DataRequestResponseStripper {
    private readonly dataResponse;
    private readonly stripParams;
    private requestedNodeNames;
    constructor(dataResponse: DataRequestResponse, stripParams: BrokerMessage.ToRequester.TaskDataRequest['requestParams']);
    strip(): DataRequestResponse;
    private stripRunExecutionData;
    private stripRunData;
    private stripPinData;
    private stripEnvProviderState;
    private stripInputData;
    private stripChunkedInputData;
    private filterObjectByNodeNames;
    private determinePrevNodeName;
}
