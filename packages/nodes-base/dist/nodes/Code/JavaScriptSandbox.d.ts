import { Resolver } from '@n8n/vm2';
import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { Sandbox, SandboxContext } from './Sandbox.js';
import 'events';

declare const vmResolver: Resolver;
declare class JavaScriptSandbox extends Sandbox {
    private jsCode;
    private readonly vm;
    constructor(context: SandboxContext, jsCode: string, helpers: IExecuteFunctions['helpers'], options?: {
        resolver?: Resolver;
    });
    runCode<T = unknown>(): Promise<T>;
    runCodeAllItems(options?: {
        multiOutput?: boolean;
    }): Promise<INodeExecutionData[] | INodeExecutionData[][]>;
    runCodeEachItem(itemIndex: number): Promise<INodeExecutionData | undefined>;
}

export { JavaScriptSandbox, vmResolver };
