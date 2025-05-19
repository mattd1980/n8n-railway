import { BaseCommand } from './base-command';
export declare class Execute extends BaseCommand {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        id: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        rawOutput: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    needsCommunityPackages: boolean;
    needsTaskRunner: boolean;
    init(): Promise<void>;
    run(): Promise<void>;
    catch(error: Error): Promise<void>;
}
