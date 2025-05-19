import { BaseFilter } from './base.filter.dto';
export declare class CredentialsFilter extends BaseFilter {
    name?: string;
    type?: string;
    projectId?: string;
    static fromString(rawFilter: string): Promise<Record<string, any>>;
}
