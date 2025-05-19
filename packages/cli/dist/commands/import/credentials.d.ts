import { BaseCommand } from '../base-command';
export declare class ImportCredentialsCommand extends BaseCommand {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        input: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        separate: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        userId: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        projectId: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    private transactionManager;
    run(): Promise<void>;
    catch(error: Error): Promise<void>;
    private reportSuccess;
    private storeCredential;
    private checkRelations;
    private readCredentials;
    private getCredentialOwner;
    private credentialExists;
    private getProject;
}
