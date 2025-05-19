import type { IrreversibleMigration, MigrationContext } from '../migration-types';
export declare class RenameAnalyticsToInsights1741167584277 implements IrreversibleMigration {
    up({ schemaBuilder: { createTable, column, dropTable } }: MigrationContext): Promise<void>;
}
