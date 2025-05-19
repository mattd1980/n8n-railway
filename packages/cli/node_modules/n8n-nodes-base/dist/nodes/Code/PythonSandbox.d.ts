import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { Sandbox, SandboxContext } from './Sandbox.js';
import 'events';

declare class PythonSandbox extends Sandbox {
    private pythonCode;
    private readonly context;
    constructor(context: SandboxContext, pythonCode: string, helpers: IExecuteFunctions['helpers']);
    runCode<T = unknown>(): Promise<T>;
    runCodeAllItems(): Promise<INodeExecutionData[]>;
    runCodeEachItem(itemIndex: number): Promise<INodeExecutionData>;
    private runCodeInPython;
    private getPrettyError;
}

export { PythonSandbox };
