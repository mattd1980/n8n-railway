import type { MigrationContext, ReversibleMigration } from '../migration-types';
export declare class CreateTestMetricTable1732271325258 implements ReversibleMigration {
    up({ schemaBuilder: { createTable, column } }: MigrationContext): Promise<void>;
    down({ schemaBuilder: { dropTable } }: MigrationContext): Promise<void>;
}
