import { ActiveWorkflowManager } from '../active-workflow-manager';
import { Server } from '../server';
import { BaseCommand } from './base-command';
export declare class Start extends BaseCommand {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        open: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        tunnel: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        reinstallMissingPackages: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    protected activeWorkflowManager: ActiveWorkflowManager;
    protected server: Server;
    needsCommunityPackages: boolean;
    needsTaskRunner: boolean;
    private getEditorUrl;
    private openBrowser;
    stopProcess(): Promise<void>;
    private generateStaticAssets;
    init(): Promise<void>;
    initOrchestration(): Promise<void>;
    run(): Promise<void>;
    catch(error: Error): Promise<void>;
    private runEnqueuedExecutions;
}
