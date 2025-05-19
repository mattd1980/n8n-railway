import { BaseCommand } from '../base-command';
export declare class ImportWorkflowsCommand extends BaseCommand {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        input: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        separate: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        userId: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        projectId: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    run(): Promise<void>;
    private checkRelations;
    catch(error: Error): Promise<void>;
    private reportSuccess;
    private getWorkflowOwner;
    private workflowExists;
    private readWorkflows;
    private getProject;
}
