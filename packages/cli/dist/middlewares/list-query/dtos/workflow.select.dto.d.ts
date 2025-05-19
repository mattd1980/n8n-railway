import { BaseSelect } from './base.select.dto';
export declare class WorkflowSelect extends BaseSelect {
    static get selectableFields(): Set<string>;
    static fromString(rawFilter: string): Record<string, true>;
}
