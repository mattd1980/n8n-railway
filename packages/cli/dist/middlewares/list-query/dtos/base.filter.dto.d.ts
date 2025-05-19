export declare class BaseFilter {
    protected static toFilter(rawFilter: string, Filter: typeof BaseFilter): Promise<Record<string, any>>;
    private validate;
}
