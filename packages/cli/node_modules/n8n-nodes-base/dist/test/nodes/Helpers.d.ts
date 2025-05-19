import { IExecuteFunctions, IDataObject, INode } from 'n8n-workflow';

declare const createMockExecuteFunction: <T = IExecuteFunctions>(nodeParameters: IDataObject, nodeMock: INode, continueBool?: boolean) => T;

export { createMockExecuteFunction };
