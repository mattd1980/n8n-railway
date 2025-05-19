import { type IDataObject, type INodeType, type INodeTypeDescription, type INodeTypes, type IVersionedNodeType } from 'n8n-workflow';
import type { NeededNodeType } from './runner-types';
export declare const DEFAULT_NODETYPE_VERSION = 1;
export declare class TaskRunnerNodeTypes implements INodeTypes {
    private nodeTypesByVersion;
    constructor(nodeTypes: INodeTypeDescription[]);
    private parseNodeTypes;
    getByName(_nodeType: string): INodeType | IVersionedNodeType;
    getByNameAndVersion(nodeType: string, version?: number): INodeType;
    getKnownTypes(): IDataObject;
    addNodeTypeDescriptions(nodeTypeDescriptions: INodeTypeDescription[]): void;
    onlyUnknown(nodeTypes: NeededNodeType[]): NeededNodeType[];
}
