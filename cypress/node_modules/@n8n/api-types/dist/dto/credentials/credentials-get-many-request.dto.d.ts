import { Z } from 'zod-class';
declare const CredentialsGetManyRequestQuery_base: Z.Class<{
    includeScopes: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    includeData: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
    onlySharedWithMe: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodEnum<["true", "false"]>, boolean, "true" | "false">>;
}>;
export declare class CredentialsGetManyRequestQuery extends CredentialsGetManyRequestQuery_base {
}
export {};
