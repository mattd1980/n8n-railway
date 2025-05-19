import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateAnalyticsTables1739549398681 implements ReversibleMigration {
    up({ schemaBuilder: { createTable, column } }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropTable } }: MigrationContext): Promise<void>;
}
