import { BaseFilter } from './base.filter.dto';
export declare class TestDefinitionsFilter extends BaseFilter {
    workflowId?: string;
    static fromString(rawFilter: string): Promise<Record<string, any>>;
}
