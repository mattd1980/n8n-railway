import { BaseCommand } from '../base-command';
export declare class Reset extends BaseCommand {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        userId: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        projectId: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        deleteWorkflowsAndCredentials: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    run(): Promise<void>;
    getProject(userId?: string, projectId?: string): Promise<import("@n8n/db").Project>;
    catch(error: Error): Promise<void>;
    private getOwner;
}
