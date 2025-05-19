import { DynamicStructuredTool } from '@langchain/core/tools';
import type { IDataObject, INode, INodeType } from 'n8n-workflow';
import { z } from 'zod';
export type CreateNodeAsToolOptions = {
    node: INode;
    nodeType: INodeType;
    handleToolInvocation: (toolArgs: IDataObject) => Promise<unknown>;
};
export declare function nodeNameToToolName(node: INode): string;
export declare function createNodeAsTool(options: CreateNodeAsToolOptions): {
    response: DynamicStructuredTool<z.ZodObject<{
        [x: string]: z.ZodTypeAny;
    }, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>>;
};
