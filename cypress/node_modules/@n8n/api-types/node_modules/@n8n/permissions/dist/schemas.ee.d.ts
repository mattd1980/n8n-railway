import { z } from 'zod';
export declare const roleNamespaceSchema: z.ZodEnum<["global", "project", "credential", "workflow"]>;
export declare const globalRoleSchema: z.ZodEnum<["global:owner", "global:admin", "global:member"]>;
export declare const assignableGlobalRoleSchema: z.ZodEnum<["global:admin", "global:member"]>;
export declare const projectRoleSchema: z.ZodEnum<["project:personalOwner", "project:admin", "project:editor", "project:viewer"]>;
export declare const credentialSharingRoleSchema: z.ZodEnum<["credential:owner", "credential:user"]>;
export declare const workflowSharingRoleSchema: z.ZodEnum<["workflow:owner", "workflow:editor"]>;
