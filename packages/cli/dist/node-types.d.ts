import type { NeededNodeType } from '@n8n/task-runner';
import type { INodeType, INodeTypeDescription, INodeTypes, IVersionedNodeType } from 'n8n-workflow';
import { LoadNodesAndCredentials } from './load-nodes-and-credentials';
export declare class NodeTypes implements INodeTypes {
    private readonly loadNodesAndCredentials;
    constructor(loadNodesAndCredentials: LoadNodesAndCredentials);
    getWithSourcePath(nodeTypeName: string, version: number): {
        description: INodeTypeDescription;
    } & {
        sourcePath: string;
    };
    getByName(nodeType: string): INodeType | IVersionedNodeType;
    getByNameAndVersion(nodeType: string, version?: number): INodeType;
    getKnownTypes(): Record<string, import("n8n-workflow").LoadingDetails>;
    getNodeTranslationPath({ nodeSourcePath, longNodeType, locale, }: {
        nodeSourcePath: string;
        longNodeType: string;
        locale: string;
    }): Promise<string>;
    private getMaxVersion;
    private isVersionedDirname;
    getNodeTypeDescriptions(nodeTypes: NeededNodeType[]): INodeTypeDescription[];
}
