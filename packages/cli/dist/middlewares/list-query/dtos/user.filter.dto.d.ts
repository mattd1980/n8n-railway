import { BaseFilter } from './base.filter.dto';
export declare class UserFilter extends BaseFilter {
    email?: string;
    firstName?: string;
    lastName?: string;
    isOwner?: boolean;
    static fromString(rawFilter: string): Promise<Record<string, any>>;
}
