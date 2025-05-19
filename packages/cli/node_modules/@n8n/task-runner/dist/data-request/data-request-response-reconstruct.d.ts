import type { IExecuteData, INodeExecutionData } from 'n8n-workflow';
import type { DataRequestResponse, InputDataChunkDefinition } from '../runner-types';
export declare class DataRequestResponseReconstruct {
    reconstructConnectionInputItems(inputData: DataRequestResponse['inputData'], chunk?: InputDataChunkDefinition): Array<INodeExecutionData | undefined>;
    reconstructExecuteData(response: DataRequestResponse, inputItems: INodeExecutionData[]): IExecuteData;
}
