import { type InstalledNodes, type InstalledPackages, type User } from '@n8n/db';
import { BaseCommand } from './base-command';
export declare class CommunityNode extends BaseCommand {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        uninstall: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        package: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        credential: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        userId: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    init(): Promise<void>;
    run(): Promise<void>;
    catch(error: Error): Promise<void>;
    uninstallCredential(credentialType: string, userId: string): Promise<void>;
    findUserById(userId: string): Promise<User | null>;
    findCredentialsByType(credentialType: string): Promise<import("@n8n/db").CredentialsEntity[]>;
    deleteCredential(user: User, credentialId: string): Promise<void>;
    uninstallPackage(packageName: string): Promise<void>;
    pruneDependencies(): Promise<void>;
    parseFlags(): Promise<import("@oclif/core/lib/interfaces").ParserOutput<{
        help: void;
        uninstall: boolean;
        package: string | undefined;
        credential: string | undefined;
        userId: string | undefined;
    }, {
        [flag: string]: any;
    }, {
        [arg: string]: any;
    }>>;
    deleteCommunityNode(node: InstalledNodes): Promise<import("@n8n/typeorm").DeleteResult>;
    removeCommunityPackage(packageName: string, communityPackage: InstalledPackages): Promise<void>;
    findCommunityPackage(packageName: string): Promise<InstalledPackages | null>;
}
