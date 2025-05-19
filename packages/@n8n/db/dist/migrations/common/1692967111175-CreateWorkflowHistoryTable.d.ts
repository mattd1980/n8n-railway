import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateWorkflowHistoryTable1692967111175 implements ReversibleMigration {
    up({ schemaBuilder: { createTable, column } }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropTable } }: MigrationContext): Promise<void>;
}
