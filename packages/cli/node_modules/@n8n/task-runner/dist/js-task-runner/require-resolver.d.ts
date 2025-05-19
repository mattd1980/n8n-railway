export type RequireResolverOpts = {
    allowedBuiltInModules: Set<string> | '*';
    allowedExternalModules: Set<string> | '*';
};
export type RequireResolver = (request: string) => unknown;
export declare function createRequireResolver({ allowedBuiltInModules, allowedExternalModules, }: RequireResolverOpts): (request: string) => unknown;
