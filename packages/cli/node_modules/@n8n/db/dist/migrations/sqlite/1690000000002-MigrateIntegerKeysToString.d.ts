import type { MigrationContext, IrreversibleMigration } from '../migration-types';
export declare class MigrateIntegerKeysToString1690000000002 implements IrreversibleMigration {
    transaction: false;
    up(context: MigrationContext): Promise<void>;
}
