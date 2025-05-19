import { MigrationExecutor, DataSource as Connection } from '@n8n/typeorm';
import { Command } from '@oclif/core';
import { Logger } from 'n8n-core';
export declare function main(logger: Logger, connection: Connection, migrationExecutor: MigrationExecutor): Promise<void>;
export declare class DbRevertMigrationCommand extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
    };
    protected logger: Logger;
    private connection;
    init(): Promise<void>;
    run(): Promise<void>;
    catch(error: Error): Promise<void>;
    protected finally(error: Error | undefined): Promise<void>;
}
