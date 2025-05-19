import { IConnections, IDataObject, IWorkflowSettings, WorkflowFEMeta } from 'n8n-workflow';
import type { IBinaryKeyData, INode, IPairedItemData } from 'n8n-workflow';
import { WithTimestampsAndStringId } from './abstract-entity';
import { type Folder } from './folder';
import type { SharedWorkflow } from './shared-workflow';
import type { TagEntity } from './tag-entity';
import type { IWorkflowDb } from './types-db';
import type { WorkflowStatistics } from './workflow-statistics';
import type { WorkflowTagMapping } from './workflow-tag-mapping';
export declare class WorkflowEntity extends WithTimestampsAndStringId implements IWorkflowDb {
    name: string;
    active: boolean;
    isArchived: boolean;
    nodes: INode[];
    connections: IConnections;
    settings?: IWorkflowSettings;
    staticData?: IDataObject;
    meta?: WorkflowFEMeta;
    tags?: TagEntity[];
    tagMappings: WorkflowTagMapping[];
    shared: SharedWorkflow[];
    statistics: WorkflowStatistics[];
    pinData?: ISimplifiedPinData;
    versionId: string;
    triggerCount: number;
    parentFolder: Folder | null;
}
export interface ISimplifiedPinData {
    [nodeName: string]: Array<{
        json: IDataObject;
        binary?: IBinaryKeyData;
        pairedItem?: IPairedItemData | IPairedItemData[] | number;
    }>;
}
