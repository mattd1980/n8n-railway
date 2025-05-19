import { BaseCommand } from '../base-command';
export declare class ExportCredentialsCommand extends BaseCommand {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        all: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        backup: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        id: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        output: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        pretty: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        separate: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        decrypted: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    run(): Promise<void>;
    catch(error: Error): Promise<void>;
}
