export declare class BaseSelect {
    static selectableFields: Set<string>;
    protected static toSelect(rawFilter: string, Select: typeof BaseSelect): Record<string, true>;
}
