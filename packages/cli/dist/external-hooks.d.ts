import type { FrontendSettings, UserUpdateRequestDto } from '@n8n/api-types';
import type { ClientOAuth2Options } from '@n8n/client-oauth2';
import { GlobalConfig } from '@n8n/config';
import type { TagEntity, User, ICredentialsDb, PublicUser } from '@n8n/db';
import { CredentialsRepository, WorkflowRepository, SettingsRepository, UserRepository } from '@n8n/db';
import { ErrorReporter, Logger } from 'n8n-core';
import type { IRun, IWorkflowBase, Workflow, WorkflowExecuteMode } from 'n8n-workflow';
import type clientOAuth1 from 'oauth-1.0a';
import type { AbstractServer } from './abstract-server';
import type { Config } from './config';
type ExternalHooksMap = {
    'n8n.ready': [server: AbstractServer, config: Config];
    'n8n.stop': never;
    'worker.ready': never;
    'activeWorkflows.initialized': never;
    'credentials.create': [encryptedData: ICredentialsDb];
    'credentials.update': [newCredentialData: ICredentialsDb];
    'credentials.delete': [credentialId: string];
    'frontend.settings': [frontendSettings: FrontendSettings];
    'mfa.beforeSetup': [user: User];
    'oauth1.authenticate': [
        oAuthOptions: clientOAuth1.Options,
        oauthRequestData: {
            oauth_callback: string;
        }
    ];
    'oauth2.authenticate': [oAuthOptions: ClientOAuth2Options];
    'oauth2.callback': [oAuthOptions: ClientOAuth2Options];
    'tag.beforeCreate': [tag: TagEntity];
    'tag.afterCreate': [tag: TagEntity];
    'tag.beforeUpdate': [tag: TagEntity];
    'tag.afterUpdate': [tag: TagEntity];
    'tag.beforeDelete': [tagId: string];
    'tag.afterDelete': [tagId: string];
    'user.deleted': [user: PublicUser];
    'user.profile.beforeUpdate': [
        userId: string,
        currentEmail: string,
        payload: UserUpdateRequestDto
    ];
    'user.profile.update': [currentEmail: string, publicUser: PublicUser];
    'user.password.update': [updatedEmail: string, updatedPassword: string];
    'user.invited': [emails: string[]];
    'workflow.create': [createdWorkflow: IWorkflowBase];
    'workflow.afterCreate': [createdWorkflow: IWorkflowBase];
    'workflow.activate': [updatedWorkflow: IWorkflowBase];
    'workflow.update': [updatedWorkflow: IWorkflowBase];
    'workflow.afterUpdate': [updatedWorkflow: IWorkflowBase];
    'workflow.delete': [workflowId: string];
    'workflow.afterDelete': [workflowId: string];
    'workflow.afterArchive': [workflowId: string];
    'workflow.afterUnarchive': [workflowId: string];
    'workflow.preExecute': [workflow: Workflow, mode: WorkflowExecuteMode];
    'workflow.postExecute': [
        fullRunData: IRun | undefined,
        workflowData: IWorkflowBase,
        executionId: string
    ];
};
type HookNames = keyof ExternalHooksMap;
export declare class ExternalHooks {
    private readonly logger;
    private readonly errorReporter;
    private readonly globalConfig;
    private readonly registered;
    private readonly dbCollections;
    constructor(logger: Logger, errorReporter: ErrorReporter, globalConfig: GlobalConfig, userRepository: UserRepository, settingsRepository: SettingsRepository, credentialsRepository: CredentialsRepository, workflowRepository: WorkflowRepository);
    init(): Promise<void>;
    private loadHooks;
    run<HookName extends HookNames>(hookName: HookName, hookParameters?: ExternalHooksMap[HookName]): Promise<void>;
}
export {};
