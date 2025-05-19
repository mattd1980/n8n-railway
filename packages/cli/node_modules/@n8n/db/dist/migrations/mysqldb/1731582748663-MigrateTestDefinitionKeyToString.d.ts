import type { MigrationContext, IrreversibleMigration } from '../migration-types';
export declare class MigrateTestDefinitionKeyToString1731582748663 implements IrreversibleMigration {
    up(context: MigrationContext): Promise<void>;
}
