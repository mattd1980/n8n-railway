import { z } from 'zod';
import { Z } from 'zod-class';
declare const SamlPreferences_base: Z.Class<{
    mapping: z.ZodOptional<z.ZodObject<{
        email: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        userPrincipalName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        firstName: string;
        lastName: string;
        userPrincipalName: string;
    }, {
        email: string;
        firstName: string;
        lastName: string;
        userPrincipalName: string;
    }>>;
    metadata: z.ZodOptional<z.ZodString>;
    metadataUrl: z.ZodOptional<z.ZodString>;
    ignoreSSL: z.ZodDefault<z.ZodBoolean>;
    loginBinding: z.ZodDefault<z.ZodEnum<["redirect", "post"]>>;
    loginEnabled: z.ZodOptional<z.ZodBoolean>;
    loginLabel: z.ZodOptional<z.ZodString>;
    authnRequestsSigned: z.ZodDefault<z.ZodBoolean>;
    wantAssertionsSigned: z.ZodDefault<z.ZodBoolean>;
    wantMessageSigned: z.ZodDefault<z.ZodBoolean>;
    acsBinding: z.ZodDefault<z.ZodEnum<["redirect", "post"]>>;
    signatureConfig: z.ZodDefault<z.ZodObject<{
        prefix: z.ZodDefault<z.ZodString>;
        location: z.ZodObject<{
            reference: z.ZodString;
            action: z.ZodEnum<["before", "after", "prepend", "append"]>;
        }, "strip", z.ZodTypeAny, {
            action: "before" | "after" | "prepend" | "append";
            reference: string;
        }, {
            action: "before" | "after" | "prepend" | "append";
            reference: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        prefix: string;
        location: {
            action: "before" | "after" | "prepend" | "append";
            reference: string;
        };
    }, {
        location: {
            action: "before" | "after" | "prepend" | "append";
            reference: string;
        };
        prefix?: string | undefined;
    }>>;
    relayState: z.ZodDefault<z.ZodString>;
}>;
export declare class SamlPreferences extends SamlPreferences_base {
}
export {};
