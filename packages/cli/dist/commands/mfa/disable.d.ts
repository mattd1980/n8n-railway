import { BaseCommand } from '../base-command';
export declare class DisableMFACommand extends BaseCommand {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        email: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    init(): Promise<void>;
    run(): Promise<void>;
    catch(error: Error): Promise<void>;
    private reportSuccess;
    private reportUserDoesNotExistError;
}
