import type { SharedWorkflow, User } from '@n8n/db';
import { SharedWorkflowRepository } from '@n8n/db';
import { type Scope } from '@n8n/permissions';
import type { EntityManager } from '@n8n/typeorm';
export declare class WorkflowFinderService {
    private readonly sharedWorkflowRepository;
    constructor(sharedWorkflowRepository: SharedWorkflowRepository);
    findWorkflowForUser(workflowId: string, user: User, scopes: Scope[], options?: {
        includeTags?: boolean;
        includeParentFolder?: boolean;
        em?: EntityManager;
    }): Promise<import("@n8n/db").WorkflowEntity | null>;
    findAllWorkflowsForUser(user: User, scopes: Scope[]): Promise<{
        projectId: string;
        name: string;
        active: boolean;
        isArchived: boolean;
        nodes: import("n8n-workflow").INode[];
        connections: import("n8n-workflow").IConnections;
        settings?: import("n8n-workflow").IWorkflowSettings;
        staticData?: import("n8n-workflow").IDataObject;
        meta?: import("n8n-workflow").WorkflowFEMeta;
        tags?: import("@n8n/db").TagEntity[];
        tagMappings: import("@n8n/db").WorkflowTagMapping[];
        shared: SharedWorkflow[];
        statistics: import("@n8n/db").WorkflowStatistics[];
        pinData?: import("@n8n/db/dist/entities/workflow-entity").ISimplifiedPinData;
        versionId: string;
        triggerCount: number;
        parentFolder: import("@n8n/db").Folder | null;
        id: string;
        generateId(): void;
        createdAt: Date;
        updatedAt: Date;
        setUpdateDate(): void;
    }[]>;
}
