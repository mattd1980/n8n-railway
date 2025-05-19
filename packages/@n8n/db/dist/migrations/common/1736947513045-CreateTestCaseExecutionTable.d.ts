import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateTestCaseExecutionTable1736947513045 implements ReversibleMigration {
    up({ schemaBuilder: { createTable, column } }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropTable } }: MigrationContext): Promise<void>;
}
