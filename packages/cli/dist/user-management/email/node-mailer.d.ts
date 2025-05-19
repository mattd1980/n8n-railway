import { GlobalConfig } from '@n8n/config';
import { ErrorReporter, Logger } from 'n8n-core';
import type { MailData, SendEmailResult } from './interfaces';
export declare class NodeMailer {
    private readonly logger;
    private readonly errorReporter;
    readonly sender: string;
    private transport;
    constructor(globalConfig: GlobalConfig, logger: Logger, errorReporter: ErrorReporter);
    sendMail(mailData: MailData): Promise<SendEmailResult>;
}
