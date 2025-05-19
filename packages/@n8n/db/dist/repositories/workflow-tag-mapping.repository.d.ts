import { DataSource, Repository } from '@n8n/typeorm';
import { WorkflowTagMapping } from '../entities';
export declare class WorkflowTagMappingRepository extends Repository<WorkflowTagMapping> {
    constructor(dataSource: DataSource);
    overwriteTaggings(workflowId: string, tagIds: string[]): Promise<import("@n8n/typeorm").InsertResult>;
}
