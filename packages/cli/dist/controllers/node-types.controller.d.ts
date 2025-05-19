import { Request } from 'express';
import type { INodeTypeDescription } from 'n8n-workflow';
import { NodeTypes } from '../node-types';
export declare class NodeTypesController {
    private readonly nodeTypes;
    constructor(nodeTypes: NodeTypes);
    getNodeInfo(req: Request): Promise<INodeTypeDescription[]>;
}
