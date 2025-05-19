import type { ICredentialType, ICredentialTypeData, INodeCredentialDescription, INodeType, INodeTypeBaseDescription, INodeTypeData, INodeTypeNameVersion, IVersionedNodeType, KnownNodesAndCredentials } from 'n8n-workflow';
import { Logger } from '../logging/logger';
export type Types = {
    nodes: INodeTypeBaseDescription[];
    credentials: ICredentialType[];
};
export declare abstract class DirectoryLoader {
    readonly directory: string;
    protected excludeNodes: string[];
    protected includeNodes: string[];
    isLazyLoaded: boolean;
    loadedNodes: INodeTypeNameVersion[];
    nodeTypes: INodeTypeData;
    credentialTypes: ICredentialTypeData;
    known: KnownNodesAndCredentials;
    types: Types;
    readonly nodesByCredential: Record<string, string[]>;
    protected readonly logger: Logger;
    constructor(directory: string, excludeNodes?: string[], includeNodes?: string[]);
    abstract packageName: string;
    abstract loadAll(): Promise<void>;
    reset(): void;
    protected resolvePath(file: string): string;
    private loadClass;
    loadNodeFromFile(filePath: string): void;
    getNode(nodeType: string): import("n8n-workflow").LoadedClass<INodeType | IVersionedNodeType>;
    loadCredentialFromFile(filePath: string): void;
    getCredential(credentialType: string): import("n8n-workflow").LoadedClass<ICredentialType>;
    getCredentialsForNode(object: IVersionedNodeType | INodeType): INodeCredentialDescription[];
    getVersionedNodeTypeAll(object: IVersionedNodeType | INodeType): INodeType[];
    private getCodex;
    private addCodex;
    private addLoadOptionsMethods;
    private applySpecialNodeParameters;
    private getIconPath;
    private fixIconPaths;
    static applyDeclarativeNodeOptionParameters(nodeType: INodeType): void;
}
