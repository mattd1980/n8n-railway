import { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

declare function isObject(maybe: unknown): maybe is {
    [key: string]: unknown;
};
declare function standardizeOutput(output: IDataObject): IDataObject;
declare const addPostExecutionWarning: (context: IExecuteFunctions, returnData: INodeExecutionData[], inputItemsLength: number) => void;

export { addPostExecutionWarning, isObject, standardizeOutput };
