import { WebhookServer } from '../webhooks/webhook-server';
import { BaseCommand } from './base-command';
export declare class Webhook extends BaseCommand {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
    };
    protected server: WebhookServer;
    needsCommunityPackages: boolean;
    stopProcess(): Promise<void>;
    init(): Promise<void>;
    run(): Promise<void>;
    catch(error: Error): Promise<void>;
    initOrchestration(): Promise<void>;
}
