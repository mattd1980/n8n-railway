import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateTestDefinitionTable1730386903556 implements ReversibleMigration {
    up({ schemaBuilder: { createTable, column } }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropTable } }: MigrationContext): Promise<void>;
}
