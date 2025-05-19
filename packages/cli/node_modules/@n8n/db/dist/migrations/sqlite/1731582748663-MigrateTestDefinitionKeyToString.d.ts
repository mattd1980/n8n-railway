import type { MigrationContext, IrreversibleMigration } from '../migration-types';
export declare class MigrateTestDefinitionKeyToString1731582748663 implements IrreversibleMigration {
    transaction: false;
    up(context: MigrationContext): Promise<void>;
}
