import type { AuthPrincipal } from '@n8n/permissions';
import { GlobalRole } from '@n8n/permissions';
import type { IUser, IUserSettings } from 'n8n-workflow';
import { WithTimestamps } from './abstract-entity';
import type { ApiKey } from './api-key';
import type { AuthIdentity } from './auth-identity';
import type { ProjectRelation } from './project-relation';
import type { SharedCredentials } from './shared-credentials';
import type { SharedWorkflow } from './shared-workflow';
import type { IPersonalizationSurveyAnswers } from './types-db';
export declare class User extends WithTimestamps implements IUser, AuthPrincipal {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    personalizationAnswers: IPersonalizationSurveyAnswers | null;
    settings: IUserSettings | null;
    role: GlobalRole;
    authIdentities: AuthIdentity[];
    apiKeys: ApiKey[];
    sharedWorkflows: SharedWorkflow[];
    sharedCredentials: SharedCredentials[];
    projectRelations: ProjectRelation[];
    disabled: boolean;
    preUpsertHook(): void;
    mfaEnabled: boolean;
    isPending: boolean;
    computeIsPending(): void;
    toJSON(): Omit<this, "setUpdateDate" | "toJSON" | "password" | "preUpsertHook" | "computeIsPending" | "createPersonalProjectName" | "toIUser">;
    createPersonalProjectName(): string;
    toIUser(): IUser;
}
