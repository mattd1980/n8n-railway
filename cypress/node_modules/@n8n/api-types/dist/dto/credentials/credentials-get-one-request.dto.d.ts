import { Z } from 'zod-class';
declare const CredentialsGetOneRequestQuery_base: Z.Class<{
    includeData: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodEnum<["true", "false"]>, boolean, "true" | "false">>>;
}>;
export declare class CredentialsGetOneRequestQuery extends CredentialsGetOneRequestQuery_base {
}
export {};
