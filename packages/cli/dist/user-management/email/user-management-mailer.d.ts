import { GlobalConfig } from '@n8n/config';
import type { User } from '@n8n/db';
import { UserRepository } from '@n8n/db';
import { Logger } from 'n8n-core';
import type { IWorkflowBase } from 'n8n-workflow';
import { EventService } from '../../events/event.service';
import { UrlService } from '../../services/url.service';
import type { InviteEmailData, PasswordResetData, SendEmailResult } from './interfaces';
import { NodeMailer } from './node-mailer';
type Template = HandlebarsTemplateDelegate<unknown>;
type TemplateName = 'user-invited' | 'password-reset-requested' | 'workflow-shared' | 'credentials-shared';
export declare class UserManagementMailer {
    private readonly logger;
    private readonly userRepository;
    private readonly urlService;
    private readonly eventService;
    readonly isEmailSetUp: boolean;
    readonly templateOverrides: GlobalConfig['userManagement']['emails']['template'];
    readonly templatesCache: Partial<Record<TemplateName, Template>>;
    readonly mailer: NodeMailer | undefined;
    constructor(globalConfig: GlobalConfig, logger: Logger, userRepository: UserRepository, urlService: UrlService, eventService: EventService);
    invite(inviteEmailData: InviteEmailData): Promise<SendEmailResult>;
    passwordReset(passwordResetData: PasswordResetData): Promise<SendEmailResult>;
    notifyWorkflowShared({ sharer, newShareeIds, workflow, }: {
        sharer: User;
        newShareeIds: string[];
        workflow: IWorkflowBase;
    }): Promise<SendEmailResult>;
    notifyCredentialsShared({ sharer, newShareeIds, credentialsName, }: {
        sharer: User;
        newShareeIds: string[];
        credentialsName: string;
    }): Promise<SendEmailResult>;
    getTemplate(templateName: TemplateName): Promise<Template>;
    private get basePayload();
}
export {};
