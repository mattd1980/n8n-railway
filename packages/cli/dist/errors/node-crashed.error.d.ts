import type { INode } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
export declare class NodeCrashedError extends NodeOperationError {
    constructor(node: INode);
}
