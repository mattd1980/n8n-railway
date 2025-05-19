import { BaseFilter } from './base.filter.dto';
export declare class WorkflowFilter extends BaseFilter {
    name?: string;
    active?: boolean;
    isArchived?: boolean;
    tags?: string[];
    projectId?: string;
    parentFolderId?: string;
    static fromString(rawFilter: string): Promise<Record<string, any>>;
}
