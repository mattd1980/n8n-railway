import type { AllRoleTypes, Resource, Scope } from '../types.ee';
export declare const COMBINED_ROLE_MAP: Record<AllRoleTypes, Scope[]>;
export declare function getRoleScopes(role: AllRoleTypes, filters?: Resource[]): Scope[];
